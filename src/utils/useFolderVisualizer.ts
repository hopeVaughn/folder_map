import React, { useState, useCallback } from 'react';

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
): Promise<TreeNode | null> => {
  // Exclude the folder if it's in the foldersToExclude array
  if (foldersToExclude.includes(entry.name)) {
    return null;
  }

  // Initialize the tree node with default values
  const result: TreeNode = {
    name: entry.name,
    type: 'directory',
    path,
    children: [],
  };

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
      if (childResult) {
        result.children!.push(childResult);
      }
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
const generateASCII = (
  tree: TreeNode | null,
  depth = 0,
  isLast = false
): Array<{ text: string; isPackageJson: boolean; path: string }> => {
  if (!tree) return [];

  const prefix = isLast ? '└── ' : '├── ';
  const padding = depth ? '│   '.repeat(depth - 1) + prefix : '';

  const output = [
    {
      text: padding + tree.name + (tree.type === 'directory' ? '/' : ''),
      isPackageJson: tree.name === 'package.json',
      path: tree.path,
    },
  ];

  if (tree.children) {
    tree.children.forEach((child: TreeNode, index: number) => {
      output.push(
        ...generateASCII(child, depth + 1, index === tree.children!.length - 1)
      );
    });
  }

  return output;
};

// Custom hook for folder visualization
export const useFolderVisualizer = (foldersToExclude: string[]) => {
  // State for storing the generated ASCII diagram
  const [asciiDiagram, setAsciiDiagram] = useState<Array<{ text: string; isPackageJson: boolean; path: string }>>([]);
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
  const handleButtonClick = useCallback(async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const directoryHandle = await window.showDirectoryPicker();
      const tree = await traverseDirectory(
        directoryHandle,
        foldersToExclude,
        ''
      );
      const ascii = generateASCII(tree);
      setAsciiDiagram(ascii);
    } catch (error) {
      console.error(error);
    }
  }, [foldersToExclude]);


  // Return values and functions to be used by the component
  return {
    asciiDiagram,
    setAsciiDiagram,
    handleDrop,
    handleDragOver,
    handleButtonClick,
  };
};
