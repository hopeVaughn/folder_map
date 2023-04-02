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
    <div>
      {foldersToExclude.map((folder, index) => (
        <div key={index} className='flex items-center space-x-2'>
          <input
            type='text'
            value={folder}
            placeholder={`Folder to exclude ${index + 1}`}
            onChange={(e) => handleFolderChange(index, e.target.value)}
          />
          <button onClick={() => handleRemoveFolder(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddFolder}>Add Folder to Exclude</button>
    </div>
  );
};
