## Explanation of this application:

1. This application uses Vite because it supports ESM (ECMAScript Modules) which can reduce page load times and improve application performance. And it also supports Hot Module Replacement (HMR): allowing fast code changes without the need to reload the entire page.
2. This application uses React Js version 18.2
3. Using Tailwind CSS and Material UI to make it easier to build UI quickly
4. Using Json-server to create a fake REST API.
5. Use axios to make HTTP requests from the client (browser) side or from a JavaScript environment such as Node.js.

## Code Structure
1. 
components -> cart -> carTable.jsx, index.jsx

The component folder is a folder that stores components that are ready to use and can be reused if needed. cartTable.jsx is a ready-to-use component that contains a cart table. index.jsx which is in the cart folder is the parent component to hold the carTable component.

Note: I don't separate buttons and icons because I use Material UI which makes it easier for me to create a back button if needed. And for icons, the UI material is already provided and the user only needs to call it as a component.

2. 
pages -> home.jsx, productDetail.jsx

In the pages folder, there are components home.jsx and productDetail.jsx. The home.jsx folder contains an index component that comes from the cart folder. Which means that home.jsx is the main component that was created to make it easier for developers to maintain code in the future. Then there is productDetail.jsx, this is a component to display productDetail when the product list is clicked. And data will be taken from the API based on ID.

Note: I don't separate buttons and icons because I use Material UI which makes it easier for me to create a back button if needed. And for icons, the UI material is already provided and the user only needs to call it as a component.

3. 
App.jsx

App.jsx is a file that contains the routes that I have created. I am using react-router-dom to create page navigation.

4. 
main.jsx

main.jsx is the parent component of all the components that I have created. then in it the App component is called and will be rendered using document.getElementById where the "root" id will be connected to the index.html file


## How to Run:
1. npm install or yarn install, for install depedencies
2. json-server --watch db.json --port 9000, for run REST API using json-server library
3. npm run dev, for run the app and open http://localhost:5173/ for see the app



