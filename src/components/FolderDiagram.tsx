import React from 'react';

type Props = {
  diagram: string;
};

export const FolderDiagram: React.FC<Props> = ({ diagram }) => {
  return <pre>{diagram}</pre>;
};
