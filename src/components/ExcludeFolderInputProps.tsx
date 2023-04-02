import React from 'react';

type ExcludeFolderInputProps = {
  onExcludeFolderChange: (value: string) => void;
};

export const ExcludeFolderInput: React.FC<ExcludeFolderInputProps> = ({
  onExcludeFolderChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onExcludeFolderChange(event.target.value);
  };

  return (
    <div className='mb-4'>
      <label
        htmlFor='folderToExclude'
        className='block text-sm font-medium text-gray-700'
      >
        Folder to exclude
      </label>
      <input
        type='text'
        name='folderToExclude'
        id='folderToExclude'
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        onChange={handleChange}
      />
    </div>
  );
};
