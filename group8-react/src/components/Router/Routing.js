import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeTable from "../EmployeeTable";
import EmployeeCreate from "../EmployeeCreate";
import Navbar from "../Navigation";
import EmployeeUpdate from "../EmployeeUpdate";
import NotFound from "../NotFound";
import EmployeeView from "../EmployeeView";

export default function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/employees/:type?" element={<EmployeeTable />} />
          <Route path="/employee/create" element={<EmployeeCreate />} />
          <Route path="/employee/update/:id" element={<EmployeeUpdate />} />
          <Route path="/employee/view/:id" element={<EmployeeView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
