import React, { useState } from 'react';
import { FolderInput } from '../components/FolderInput';
import { ExcludeFoldersInput } from '../components/ExcludeFolderInputProps';

// Create the FolderMappingApp functional component
export const FolderMappingApp: React.FC = () => {
  // Create a state to store the folders to exclude
  const [foldersToExclude, setFoldersToExclude] = useState<string[]>([]);

  // The purpose of the FolderMappingApp component is to act as the main container
  // for the folder visualization app. It includes the ExcludeFoldersInput and
  // FolderInput components.

  // ExcludeFoldersInput component is used to manage the folders that should be
  // excluded from the folder visualization. It passes the foldersToExclude state
  // to the onExcludeFolderChange callback, which updates the state in this component.

  // FolderInput component handles folder selection and generates the ASCII diagram
  // of the folder structure. It receives the foldersToExclude state as a prop.

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold mb-4 text-center'>
        Drag and Drop Folder to Generate ASCII Diagram
      </h1>
      <ExcludeFoldersInput onExcludeFolderChange={setFoldersToExclude} />
      <FolderInput foldersToExclude={foldersToExclude} />
    </div>
  );
};
