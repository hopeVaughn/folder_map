import React, { useState } from 'react';
import { PackageJsonModal } from './PackageJsonModal';
import { findPackageJsonContent } from '../utils/findPackageJsonContent';

type Props = {
  path: string;
  onClick: (path: string) => void;
};

export const PackageJsonButton: React.FC<Props> = ({ path, onClick }) => {
  // State for storing the content of the package.json file
  const [packageJsonContent, setPackageJsonContent] = useState<string>('');

  // State for showing/hiding the modal
  const [showModal, setShowModal] = useState<boolean>(false);

  // Function to handle clicking the button
  const handleClick = async () => {
    try {
      // Use the findPackageJsonContent utility to get the package.json content
      const content = await findPackageJsonContent(path);
      setPackageJsonContent(content);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to find package.json content', err);
    }
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setPackageJsonContent('');
  };

  return (
    <>
      <button
        onClick={() => onClick(path)}
        className='bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600'
      >
        View Package.json
      </button>
      {showModal && (
        <PackageJsonModal
          content={packageJsonContent}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
