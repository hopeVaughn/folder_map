import React from 'react';
import { FolderInput } from '../components/FolderInput';

export const FolderMappingApp: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold mb-2 text-center'>
        Drag and Drop Folder to Generate ASCII Diagram
      </h1>
      <FolderInput />
    </div>
  );
};
