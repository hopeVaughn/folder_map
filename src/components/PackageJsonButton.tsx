import React from 'react';

type Props = {
  onClick: () => void;
};

const PackageJsonButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-blue-500 text-white px-2 py-1 rounded shadow hover:bg-blue-600 ml-2'
    >
      View package.json
    </button>
  );
};

export default PackageJsonButton;
