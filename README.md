# Folder Visualization Application

This project is a web-based folder visualization application that generates an ASCII diagram of a folder structure. Users can interact with the application through a drag-and-drop interface or by clicking a button to select a folder. The application allows users to exclude specific folders from the visualization by providing a list of folder names to be excluded.

## Main Components

1. **FolderMappingApp**: The main container component that includes the `ExcludeFoldersInput` and `FolderInput` components. It manages the state for the folders to be excluded and passes it down to the child components.

2. **ExcludeFoldersInput**: This component allows users to input the names of folders they want to exclude from the visualization. It provides an interface to add or remove folders to be excluded and passes the updated list of folders to the parent component `FolderMappingApp`.

3. **FolderInput**: This component handles the folder selection and generates the ASCII diagram of the folder structure. It receives the list of folders to be excluded as a prop and uses the custom hook `useFolderVisualizer` to handle the folder traversal and ASCII diagram generation.

4. **FolderDiagram**: A simple component that displays the generated ASCII diagram of the folder structure.

5. **useFolderVisualizer**: A custom hook that handles the core logic of traversing the folder structure, generating the ASCII diagram, and managing the drag-and-drop events.

Throughout the development process, various improvements and refactors were made to the code to ensure it is more readable and maintainable. These changes include adding appropriate comments to explain the logic and purpose of different parts of the code, as well as improving the structure and organization of the components.

## Technologies used

- TypeScript for both front-end and back-end development
- React as the front-end framework
- Tailwind CSS for styling

## Final Product

### Desktop

!["Desktop"](https://github.com/hopeVaughn/https://github.com/hopeVaughn/folder_map/blob/main/folder_map_01.png)

### Excluded Folders View

!["Desktop"](https://github.com/hopeVaughn/https://github.com/hopeVaughn/folder_map/blob/main/folder_map_02.png)

### Rendered Folder Structure

!["Desktop"](https://github.com/hopeVaughn/https://github.com/hopeVaughn/folder_map/blob/main/folder_map_03.png)

### Mobile View

!["Mobile"](https://github.com/hopeVaughn/https://github.com/hopeVaughn/folder_map/blob/main/folder_map_04.png)

### Mobile View

!["Search"](https://github.com/hopeVaughn/https://github.com/hopeVaughn/folder_map/blob/main/folder_map_05.png)
