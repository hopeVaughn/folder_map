// Import the useState hook from React
import { useState } from 'react';

// Define the TreeNode type
type TreeNode = {
  name: string;
  type: 'directory' | 'file';
  path: string;
  children?: TreeNode[];
};

// Recursively traverse a directory and create a tree structure of its contents
const traverseDirectory = async (
  entry: FileSystemDirectoryHandle,
  foldersToExclude: string[],
  path = ''
): Promise<TreeNode> => {
  // Initialize the tree node with default values
  const result: TreeNode = {
    name: entry.name,
    type: 'directory',
    path,
    children: [],
  };

  // Exclude the folder if it's in the foldersToExclude array
  if (foldersToExclude.includes(entry.name)) {
    return result;
  }

  // Iterate through the directory entries
  for await (const childEntry of entry) {
    const [name, child] = childEntry;
    if (child.kind === 'directory') {
      // If the child entry is a directory, recursively traverse it
      const childResult = await traverseDirectory(
        child as FileSystemDirectoryHandle,
        foldersToExclude,
        `${path}/${name}`
      );
      result.children!.push(childResult);
    } else {
      // If the child entry is a file, add it to the children array
      result.children!.push({
        name,
        type: 'file',
        path: `${path}/${name}`,
      });
    }
  }
  return result;
};

// Generate an ASCII diagram of the tree structure
const generateASCII = (tree: TreeNode, depth = 0, isLast = false): string => {
  // Set the prefix and padding based on the depth and whether the item is the last in its level
  const prefix = isLast ? '└── ' : '├── ';
  const padding = depth ? '│   '.repeat(depth - 1) + prefix : '';

  // Create the output string with the current tree node
  let output =
    padding + tree.name + (tree.type === 'directory' ? '/' : '') + '\n';

  // If the tree node has children, generate ASCII for them as well
  if (tree.children) {
    tree.children.forEach((child: TreeNode, index: number) => {
      output += generateASCII(
        child,
        depth + 1,
        index === tree.children!.length - 1
      );
    });
  }

  return output;
};

// Custom hook for folder visualization
export const useFolderVisualizer = (foldersToExclude: string[]) => {
  // State for storing the generated ASCII diagram
  const [asciiDiagram, setAsciiDiagram] = useState('');

  // Handle drop event for drag-and-drop
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('File(s) dropped');

    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i];
        if (item.kind === 'file') {
          const handle = await item.getAsFileSystemHandle();
          if (handle && handle.kind === 'directory') {
            console.log('Directory dropped');
            const fileEntry = handle as FileSystemDirectoryHandle;
            const tree = await traverseDirectory(
              handle as FileSystemDirectoryHandle,
              foldersToExclude
            );

            const ascii = generateASCII(tree);
            setAsciiDiagram(ascii);
          } else {
            console.log('File(s) dropped, but not a directory');
          }
        }
      }
    } else {
      console.log('Data transfer items not available');
    }
  };

  // Handle drag-over event for drag-and-drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Handle button click for folder selection
  const handleButtonClick = async () => {
    const handle = await window.showDirectoryPicker();
    if (handle) {
      const tree = await traverseDirectory(handle, foldersToExclude);
      const ascii = generateASCII(tree);
      setAsciiDiagram(ascii);
    }
  };

  // Return values and functions to be used by the component
  return {
    asciiDiagram,
    setAsciiDiagram,
    handleDrop,
    handleDragOver,
    handleButtonClick,
  };
};
