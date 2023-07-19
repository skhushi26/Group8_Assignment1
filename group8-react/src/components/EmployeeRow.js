import React, { Component } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";

class EmployeeRow extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };
  }

  handleDelete = () => {
    this.props.handleDeleteModal(this.props.employee._id);
  };

  handleView = () => {
    this.props.handleViewModal(this.props.employee);
  };

  render() {
    return (
      <tr key={this.props.employee._id}>
        <td>{this.props.employee.firstName}</td>
        <td>{this.props.employee.lastName}</td>
        <td>{this.props.employee.age}</td>
        <td>{moment(this.props.employee.dateOfJoining).utc().format("ll")}</td>
        <td>{this.props.employee.title}</td>
        <td>{this.props.employee.department}</td>
        <td>{this.props.employee.employeeType}</td>
        <td>{this.props.employee.currentStatus ? "Working" : "Retired"}</td>
        <td>
          <Button variant="danger" onClick={this.handleDelete} className="mr-1">
            Delete
          </Button>
          <Button variant="info" onClick={this.handleView} className="mr-1">
            View
          </Button>
          <Button as="a" variant="primary" href={`/employee/update/${this.props.employee._id}`}>
            Edit
          </Button>
        </td>
      </tr>
    );
  }
}

export default EmployeeRow;
