// PackageJsonModal.tsx
import React from 'react';

type Props = {
  content: string;
  onClose: () => void;
};

export const PackageJsonModal: React.FC<Props> = ({ content, onClose }) => {
  return (
    <div className='fixed z-10 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        ></div>
        <div className='bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:w-full md:max-w-lg'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <pre className='whitespace-pre-wrap'>{content}</pre>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              onClick={onClose}
              className='bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600'
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
