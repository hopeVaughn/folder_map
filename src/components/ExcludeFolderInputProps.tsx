import React, { useState } from 'react';

type ExcludeFoldersInputProps = {
  onExcludeFolderChange: (folders: string[]) => void;
};

export const ExcludeFoldersInput: React.FC<ExcludeFoldersInputProps> = ({
  onExcludeFolderChange,
}) => {
  const [foldersToExclude, setFoldersToExclude] = useState<string[]>([]);

  const handleAddFolder = () => {
    setFoldersToExclude([...foldersToExclude, '']);
  };

  const handleFolderChange = (index: number, value: string) => {
    const newFolders = [...foldersToExclude];
    newFolders[index] = value;
    setFoldersToExclude(newFolders);
    onExcludeFolderChange(newFolders);
  };

  const handleRemoveFolder = (index: number) => {
    const newFolders = foldersToExclude.filter((_, idx) => idx !== index);
    setFoldersToExclude(newFolders);
    onExcludeFolderChange(newFolders);
  };

  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
      {foldersToExclude.map((folder, index) => (
        <div key={index} className='flex items-center space-x-2 my-2'>
          <input
            type='text'
            value={folder}
            placeholder={`Folder to exclude ${index + 1}`}
            onChange={(e) => handleFolderChange(index, e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
          />
          <button
            onClick={() => handleRemoveFolder(index)}
            className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddFolder}
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
      >
        Add Folder to Exclude
      </button>
    </div>
  );
};
