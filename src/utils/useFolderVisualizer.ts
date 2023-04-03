import { useState } from 'react';

type TreeNode = {
  name: string;
  type: 'directory' | 'file';
  path: string;
  children?: TreeNode[];
};

const traverseDirectory = async (
  entry: FileSystemDirectoryHandle,
  foldersToExclude: string[],
  path = ''
): Promise<TreeNode> => {
  const result: TreeNode = {
    name: entry.name,
    type: 'directory',
    path,
    children: [],
  };

  if (foldersToExclude.includes(entry.name)) {
    return result;
  }

  for await (const childEntry of entry) {
    const [name, child] = childEntry;
    if (child.kind === 'directory') {
      const childResult = await traverseDirectory(
        child as FileSystemDirectoryHandle,
        foldersToExclude,
        `${path}/${name}`
      );
      result.children!.push(childResult);
    } else {
      result.children!.push({
        name,
        type: 'file',
        path: `${path}/${name}`,
      });
    }
  }
  return result;
};

const generateASCII = (tree: TreeNode, depth = 0, isLast = false): string => {
  const prefix = isLast ? '└── ' : '├── ';
  const padding = depth ? '│   '.repeat(depth - 1) + prefix : '';

  let output =
    padding + tree.name + (tree.type === 'directory' ? '/' : '') + '\n';

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

export const useFolderVisualizer = (foldersToExclude: string[]) => {
  const [asciiDiagram, setAsciiDiagram] = useState('');

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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleButtonClick = async () => {
    const handle = await window.showDirectoryPicker();
    if (handle) {
      const tree = await traverseDirectory(handle, foldersToExclude);
      const ascii = generateASCII(tree);
      setAsciiDiagram(ascii);
    }
  };

  return {
    asciiDiagram,
    setAsciiDiagram,
    handleDrop,
    handleDragOver,
    handleButtonClick,
  };
};
