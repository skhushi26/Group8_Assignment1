import moment from "moment";

const EmployeeRow = (props) => {
  return (
    <tr>
      <td>{props.employee.firstName}</td>
      <td>{props.employee.lastName}</td>
      <td>{props.employee.age}</td>
      <td>{moment(props.employee.dateOfJoining).format("ll")}</td>
      <td>{props.employee.title}</td>
      <td>{props.employee.department}</td>
      <td>{props.employee.employeeType}</td>
      <td>{props.employee.currentStatus ? "Working" : "Retired"}</td>
    </tr>
  );
};

export default EmployeeRow;
