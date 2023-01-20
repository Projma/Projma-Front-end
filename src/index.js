import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import store from "./store";
import { login, remove_token } from "../src/actions/authActions";

const root = ReactDOM.createRoot(document.getElementById('root')); // in index.html, there is a div with id="root"
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// ------------------------------

let token = localStorage.getItem('access_token');
if (token) {
    store
        .dispatch(login())
        .then(() => {
            // ReactDOM.render(<App />, document.getElementById('root'));
            root.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            );
        })
        .catch(error => {
            //console.log(error);
            // store.dispatch(remove_token());
            // ReactDOM.render(<App />, document.getElementById('root'));
            root.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            );
        });
} else {
    // ReactDOM.render(<App />, document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
