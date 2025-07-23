# Pokedex App React Native Frontend

## Tools Used
- React Native for front-end programming w/ Expo to assist in building and testing
- Expo Router for file-based routing/navigation
- Axios & React Query for API calls
- Zustand for global state management and Async Storage for persisting local device storage
- Node.js for running js on the development server & node package manager
- CSS & JS for styling and user interaction
- The PokeAPI: https://pokeapi.co/
- Laravel, PHP, etc for backend: https://github.com/MorganConnolly/Pokedex-App-Backend

## Setup
1. Install node.js for npm: https://nodejs.org/en/download
2. Clone the repo: https://github.com/MorganConnolly/Pokedex-App-Frontend
3. Install dependancies: npm install
4. Setup backend: https://github.com/MorganConnolly/Pokedex-App-Backend
5. Create .env with API address: EXPO_PUBLIC_API='[ip]/api/'
6. Start the project using Expo CLI: npx expo start
7. Install the "Expo Go" app on mobile or set up an iPhone/android emulator
8. Scan the QR code to open the app on mobile or follow the CLI instructions for running the emulator

## Video Demo
<video src="https://github.com/user-attachments/assets/c07a04f9-84a4-4e14-8250-fa7b56b6a7fc" width="500" controls></video>

## Screenshots
<table>
  <tr>
    <td><strong>Menu Flatlist</strong><br>
      <img src="docs-images/Simulator Screenshot - iPhone 16 Pro - 2025-07-11 at 09.39.10.png" alt="Menu Screenshot" height="350">
    </td>
    <td><strong>Search Functionality</strong><br>
      <img src="docs-images/Simulator Screenshot - iPhone 16 Pro - 2025-07-11 at 09.39.39.png" alt="Search" height="350">
    </td>
    <td><strong>Pokémon Details</strong><br>
      <img src="docs-images/Simulator Screenshot - iPhone 16 Pro - 2025-07-11 at 09.39.54.png" alt="Details Page" height="350">
    </td>
  </tr>
  <tr>
    <td><strong>Login</strong><br>
      <img src="docs-images/Simulator Screenshot - iPhone 16 Pro - 2025-07-23 at 10.37.50.png" alt="Login Page accepting email and password with validation" height="350">
    </td>
    <td><strong>Registration</strong><br>
      <img src="docs-images/Simulator Screenshot - iPhone 16 Pro - 2025-07-23 at 10.57.24.png" alt="Registration page accepting email, username and password with validation" height="350">
    </td>
    <td><strong>Favourites Flatlist</strong><br>
      <img src="docs-images/Simulator Screenshot - iPhone 16 Pro - 2025-07-23 at 10.58.09.png" alt="Favourites page displaying the user's favourite pokemon using a paged flatlist" height="350">
    </td>
  </tr>
</table>

## Learning Summary
### The Component Lifecycle
1. Mouting - Instance created and added to the DOM.
2. Updating - Recieves updates (i.e. props changing).
4. Error Handling - Called if there's an error in rendering.
3. Unmounting - Instance removed when uneeded.
Components render on mounting and re-render on update and error handling. Parent re-rendering causes children to re-render recursively.
### Hooks
Allow function components to access state by 'hooking' into it.
### Props
Properties act like function arguments in JavaScript and attributes in HTML. They pass data from parents to children and allow components to render different outputs based on the data they recieve.
### State Management
Local component state created with useState. Changes as a result of state applied using useEffect which can run on mount/unmount and dependancy array changes. Zustand facilitates global state which is much simpler because it removes the need to feed state through component props. Async Storage can be used to persist local storage on the device. 
### Why Axios?
Axios is a third-party library which replaces the native Fetch API which automatically parses JSON values and has comprehensive error handling.
### Why React Query?
Normally, you have to manage the state returned from API calls manually and catch any errors returned. The data also isn't cached leading to unnecessary API calls. React Query reduces boilerplate by simplifying data fetching, error handling and improves efficiency through caching.
### Expo Router
Expo Router is a file-based router, making navigation simpler. Enables deeplinks and ensures the pages work offline.
### FlatList VS ScrollView
ScrollView loads all data during mount into the RAM, leading to long retrieval times. FlatList mounts 10 items by default and mounts and unmounts items as users scroll, making it more efficient for large datasets.
### Bundlers
Takes your JavaScript, CSS, and other code and converts it into optimised bundles for device execution.
### Code Execution
The JavaScript you write is executed at runtime by a JavaScript engine embedded in the app. Native modules, managing things like the camera, GPS & file system, are compiled into machine native code. A bridge allows the JS to call these functions.
