import React, { useState } from 'react';
import { FolderInput } from '../components/FolderInput';
import { ExcludeFoldersInput } from '../components/ExcludeFolderInputProps';

export const FolderMappingApp: React.FC = () => {
  const [foldersToExclude, setFoldersToExclude] = useState<string[]>([]);

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
