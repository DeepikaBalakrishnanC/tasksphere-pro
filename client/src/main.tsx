import React from "react";

import ReactDOM
from "react-dom/client";

import { ApolloProvider } from "@apollo/client/react";

import { Toaster } from "react-hot-toast";

import App
from "./App";

import "./index.css";

import client from "./graphql/apollo";

import {

  AuthProvider

} from "./context/AuthContext";

import {
  registerServiceWorker
} from "./serviceWorkerRegistration";


ReactDOM.createRoot(

  document.getElementById("root")!

).render(

  <React.StrictMode>

    <ApolloProvider client={client}>

      <AuthProvider>

        <App />

        <Toaster position="top-right" />

      </AuthProvider>

    </ApolloProvider>

  </React.StrictMode>

);

registerServiceWorker();
