import React, { useState } from 'react';

type ExcludeFolderInputProps = {
  onExcludeFolderChange: (folderName: string) => void;
};

export const ExcludeFolderInput: React.FC<ExcludeFolderInputProps> = ({
  onExcludeFolderChange,
}) => {
  const [folderToExclude, setFolderToExclude] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFolderToExclude(value);
    onExcludeFolderChange(value);
  };

  return (
    <div className='mb-4'>
      <label
        className='block text-gray-700 text-sm font-bold mb-2'
        htmlFor='folderToExclude'
      >
        Exclude Folder:
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id='folderToExclude'
        type='text'
        placeholder='Folder name to exclude'
        value={folderToExclude}
        onChange={handleChange}
      />
    </div>
  );
};
