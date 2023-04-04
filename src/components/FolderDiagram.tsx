import React from 'react';

type FolderDiagramProps = {
  diagram: Array<{ text: string; isPackageJson: boolean; path: string }>;
  onPackageJsonClick: (event: React.MouseEvent, path: string) => Promise<void>;
};

export const FolderDiagram: React.FC<FolderDiagramProps> = ({
  diagram,
  onPackageJsonClick,
}) => {
  return (
    <pre className='whitespace-pre-wrap'>
      {diagram.map((item, index) => (
        <span key={index} title={item.path}>
          {item.text}
          {item.isPackageJson && (
            <button
              className='text-xs text-blue-600 ml-2'
              onClick={(event) => onPackageJsonClick(event, item.path)}
            >
              View
            </button>
          )}
          <br />
        </span>
      ))}
    </pre>
  );
};
