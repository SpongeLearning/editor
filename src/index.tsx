import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import LoadingManager from "src/component/LoadingManager";

import App from "./App";
import rootReducer from "./reducer";
import * as serviceWorker from "./serviceWorker";

const store = configureStore({
    reducer: rootReducer,
});
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <LoadingManager>
                <App />
            </LoadingManager>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
