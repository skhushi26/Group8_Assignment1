import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import EmployeeTable from "../EmployeeTable";
import EmployeeCreate from "../EmployeeCreate";
import Navbar from "../Navigation";
import EmployeeUpdate from "../EmployeeUpdate";

export default function Routing() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Redirect exact from="/" to="/employees" />
        <Route path="/employees/:type?" component={EmployeeTable} />
        <Route path="/employee/create" component={EmployeeCreate} />
        <Route path="/employee/update/:id" component={EmployeeUpdate} />
      </Switch>
    </Router>
  );
}
