# Banking Application

This Banking Application is built with a modern technology stack, featuring a frontend developed using React with TypeScript and a backend implemented in Java with Spring Boot. It simulates the core operations of a real banking system, including user authentication, account creation, self and external account transactions, deposits, and withdrawals. To run the frontend application, Node.js (version 20 or higher, including npm) is required. For backend setup and execution, please refer to the detailed instructions available in the backend’s GitHub repository.

## Requirements for the Bank Application

`Front end`

Requirements To run the Front end application 

- <b>Node version (20v+)</b> (includes npm (node package manager))

`Backend`

Please refer and follow the instructions to the github page of Backend to run do the  backend 

https://github.com/OSB-Grads/OSB-Graduate-Assignment-2-BE




## Steps to Run the Frontend Application

First install the all dependencies for the Project by using the following command 

```
npm install
```



To Run the Front end Application

```
npm run dev 
```


To Run the Testcases in the Application

```
npm run test
```


To Build the application 

```
npm run build
```


To deploy the apllication 

```
npx serve -s dist
```


## Directory Structure of The Application
``` bash
OSB-Graduate-Assignment-2-FE
        ├── public/                                   # Static assets (favicon, index.html, etc.)
        │
        ├── src/                                      # Main source code
        │     ├── assets/                             # Project-specific images, fonts, styles
        │     ├── components/                         # Reusable UI components
        │     ├──     ├──component.tsx                # Defining the React Component
        │     ├──     ├──component.css                # React Component CSS
        │     ├── pages/                              # Page-level components (routed views)
        │     ├──     ├──page.tsx                     # Defining the React Page
        │     ├──     ├──page.css                     # React Page CSS
        │     ├── data/                               # Left-Navigation bar data along with paths
        │     ├── store/                              # Zustand Store elements 
        |     ├──     ├── dirStore/  
        |     ├──           ├──dirStore.ts/           # Definining the Zustand Store
        |     ├──           ├──dir.api.ts/            # Calling the API if needed to retrieve data
        |     ├──           ├──dir.logic.ts/          # Logic for the Updation of Zustand Component
        |     ├──           ├──dir.interface.ts/      # Definining the Expected type from API
        │     ├── utils/                              # Utility/helper functions
        │     ├── App.tsx                             # Root component
        │     ├── main.tsx                            # Application entry point
        │     └── index.css                           # Global styles
        │── test                                      # End to End testing                                 
        ├── .env                                      # Environment variables
        ├── package.json                              # Dependencies and npm scripts
        ├── tsconfig.json                             # TypeScript configuration
        ├── tsconfig.app.json                         # TypeScript application configuration
        ├── tsconfig.node.json                        # TypeScript node configuration
        ├── vite.config.ts                            # Vite configuration
        └── README.md                                 # Project documentation


```