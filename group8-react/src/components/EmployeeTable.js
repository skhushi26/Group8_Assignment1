import EmployeeRow from "./EmployeeRow";
import { Table } from "react-bootstrap";

const EmployeeTable = (props) => {
  const employees = props.employees.map((employee) => {
    return <EmployeeRow employee={employee} key={employee._id} />;
  });

  return (
    <Table striped bordered hover className="employee-table">
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Age</th>
          <th>Date of Joining</th>
          <th>Title</th>
          <th>Department</th>
          <th>Employee Type</th>
          <th>Current Status</th>
        </tr>
      </thead>
      <tbody>{employees}</tbody>
    </Table>
  );
};

export default EmployeeTable;
