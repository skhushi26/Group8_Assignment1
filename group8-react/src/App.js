/**
 * Authors:  Khushali Shah
 *          Abhi Patel
 *          Meet Jani
 *          Gurpreet Singh
 *
 * Group 8 - React App
 * Assignment 2 - PROG8730-23S-Sec8-Advanced Full-Stack Programming
 */

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./components/Router/Routing";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routing />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
