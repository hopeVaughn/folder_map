import { findPackageJsonContent } from '../utils/findPackageJsonContent';
import PackageJsonButton from './PackageJsonButton';

type Props = {
  diagram: string;
};

export const FolderDiagram: React.FC<Props> = ({ diagram }) => {
  // Define a function to handle the click event on the "Copy package.json" button
  const handleClick = async (path: string) => {
    try {
      // Use the Clipboard API to write the package.json content to the clipboard
      const content = await findPackageJsonContent(path);
      await navigator.clipboard.writeText(content);

      // Notify the user that the package.json content has been copied
      alert('Package.json content copied to clipboard!');
    } catch (err) {
      // Log an error message to the console if copying the package.json content failed
      console.error('Failed to copy package.json content', err);
    }
  };

  // Split the diagram string into an array of lines
  const lines = diagram.split('\n');

  // Initialize an empty array to hold the formatted diagram JSX
  const diagramJSX: JSX.Element[] = [];

  // Loop through each line in the diagram and create JSX for it
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.endsWith('package.json')) {
      // If the line ends with "package.json", create a button to copy the content to clipboard
      const startIndex = line.lastIndexOf('/') + 1;
      const endIndex = line.lastIndexOf('package.json') + 12;
      const path = line.substring(0, startIndex);
      const filename = line.substring(startIndex, endIndex);

      console.log('path: ', path);

      diagramJSX.push(
        <div key={i} className='flex items-center'>
          <div className='flex-grow whitespace-pre-wrap'>{line}</div>
          <div>
            <PackageJsonButton onClick={() => handleClick(path)} />
          </div>
        </div>
      );
    } else {
      // If the line doesn't end with "package.json", create a regular text node
      diagramJSX.push(<pre key={i}>{line}</pre>);
    }
  }

  return (
    <div className='overflow-auto max-w-full max-h-full'>
      <div className='bg-white rounded-lg shadow-lg p-4'>{diagramJSX}</div>
    </div>
  );
};
