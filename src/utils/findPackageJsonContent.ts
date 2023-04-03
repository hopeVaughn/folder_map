// This function takes a path string as input and returns a Promise that resolves to the content of the package.json file located at the specified path.
export const findPackageJsonContent = async (path: string): Promise<string> => {
  try {
    // Use the showDirectoryPicker API to allow the user to select a directory
    const directoryHandle = await window.showDirectoryPicker();

    // Use the getFileHandle API to get a handle to the package.json file in the selected directory
    const packageJsonHandle = await directoryHandle.getFileHandle(`${path}/package.json`);

    // Use the getFile API to get a file object for the package.json file
    const file = await packageJsonHandle.getFile();

    // Use the text() method of the file object to read the content of the package.json file as a string
    const content = await file.text();

    // Log the content to the console
    console.log('Package.json content:', content);

    // Return the content of the package.json file as a string
    return content;
  } catch (error) {
    // Log an error message to the console and re-throw the error if an error occurs
    console.error(`Failed to find package.json content in ${path}:`, error);
    throw error;
  }
};
