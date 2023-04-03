import React, { useRef, useEffect } from 'react';
import { FolderDiagram } from './FolderDiagram';
import { useFolderVisualizer } from '../utils/useFolderVisualizer';

// Define the FolderInputProps type
type FolderInputProps = {
  foldersToExclude: string[];
};

// Create the FolderInput functional component
export const FolderInput: React.FC<FolderInputProps> = ({
  foldersToExclude,
}) => {
  // Create a ref for the file input element
  const inputRef = useRef<HTMLInputElement>(null);

  // Get the hook values and functions from useFolderVisualizer
  const {
    asciiDiagram,
    setAsciiDiagram,
    handleDrop,
    handleDragOver,
    handleButtonClick,
  } = useFolderVisualizer(foldersToExclude);

  // Set the webkitdirectory attribute for the input element on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute('webkitdirectory', 'true');
    }
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div
        className='mt-2 p-6 w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-md rounded-md'
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
        {/* Render the FolderDiagram component with the ASCII diagram */}
        <div className='bg-gray-100 p-4 mb-4 border-2 border-dashed border-gray-300 rounded'>
          <FolderDiagram diagram={asciiDiagram} />
        </div>
        {/* Create an invisible file input element for folder selection */}
        <input
          type='file'
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={async (event) => {
            const input = event.target as HTMLInputElement;
            input.value = ''; // To reset the input and close the file picker
          }}
        />
        {/* Render buttons for folder selection and clearing the diagram */}
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
