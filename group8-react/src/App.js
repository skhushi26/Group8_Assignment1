/**
 * Authors:  Khushali Shah
 *          Abhi Patel
 *          Meet Jani
 *          Gurpreet Singh
 *
 * Group 8 - React App
 * Assignment 1 - PROG8730-23S-Sec8-Advanced Full-Stack Programming
 */

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import EmployeeDirectory from "./components/EmployeeDirectory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeCreate from "./components/EmployeeCreate";
import Routing from "./components/Router/Routing";
// import Routing from "./components/Router/Routing";

function App() {
  return (
    <div className="App">
      <Routing />

      {/* <EmployeeDirectory /> */}

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
  );
}

export default App;
