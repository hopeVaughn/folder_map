import React, { useRef, useState, useEffect } from 'react';
import { FolderDiagram } from './FolderDiagram';

type TreeNode = {
  name: string;
  type: 'directory' | 'file';
  path: string;
  children?: TreeNode[];
};

async function traverseDirectory(
  entry: FileSystemDirectoryHandle,
  path = ''
): Promise<TreeNode> {
  const result: TreeNode = {
    name: entry.name,
    type: 'directory',
    path,
    children: [],
  };

  for await (const childEntry of entry) {
    const [name, child] = childEntry;
    if (child.kind === 'directory') {
      const childResult = await traverseDirectory(
        child as FileSystemDirectoryHandle,
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
}

function generateASCII(tree: TreeNode, depth = 0, isLast = false): string {
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
}

export const FolderInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [asciiDiagram, setAsciiDiagram] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute('webkitdirectory', 'true');
    }
  }, []);
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
            const tree = await traverseDirectory(fileEntry);
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
    if (inputRef.current) {
      inputRef.current.click();
    }
    const handle = await window.showDirectoryPicker();
    if (handle) {
      const tree = await traverseDirectory(handle);
      const ascii = generateASCII(tree);
      setAsciiDiagram(ascii);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div
        className='p-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-md rounded-md'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold mb-4'>Folder Visualizer</h2>
          {asciiDiagram && (
            <button
              className='bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600'
              onClick={() => setAsciiDiagram('')}
            >
              Clear
            </button>
          )}
        </div>
        <p className='mb-4 text-gray-500'>
          Drag and drop a folder onto the area below or click "Select Folder"
        </p>
        <div className='bg-gray-100 p-4 mb-4 border-2 border-dashed border-gray-300 rounded'>
          <FolderDiagram diagram={asciiDiagram} />
        </div>
        <input
          type='file'
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={async (event) => {
            const input = event.target as HTMLInputElement;
            input.value = ''; // Add this line to reset the input and close the file picker
          }}
        />
        <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 w-full sm:w-auto'
            onClick={handleButtonClick}
          >
            Select Folder
          </button>
          {asciiDiagram && (
            <button
              className='bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 w-full sm:w-auto'
              onClick={() => setAsciiDiagram('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
