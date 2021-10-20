import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import './sass/main.scss'
import { Provider, useSelector } from 'react-redux'
import store from './redux/store'
ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById("root"));
