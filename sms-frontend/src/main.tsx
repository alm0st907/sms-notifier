import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Root from "./routes/root.tsx";
import {ClerkProvider} from "@clerk/clerk-react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className="dark:bg-slate-600 centered">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
                {/*this is established in .env files so ignore the lint*/}
                <App/>
                {/*  <RouterProvider router={router}/>*/}
            </ClerkProvider>
        </div>
    </React.StrictMode>,
)
