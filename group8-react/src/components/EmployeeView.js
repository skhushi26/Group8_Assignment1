import moment from "moment";
import { Component } from "react";
import { toast } from "react-toastify";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";

class EmployeeView extends Component {
  constructor() {
    super();
    this.state = {
      employee: {},
    };
  }

  async componentWillMount() {
    try {
      const query = `
          query {
            getEmployeeById(id: "${this?.props?.params.id}") {
              _id
              firstName
              lastName
              age
              dateOfJoining
              title
              department
              employeeType
              currentStatus
            }
          }
        `;

      const response = await fetch(`/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        toast.warn("Employee not found!");
        throw new Error("Request failed with status: " + response.status);
      }

      const result = await response.json();
      if (!result?.data?.getEmployeeById) toast.warn("Employee not found!");
      else this.setState({ employee: result.data.getEmployeeById });
    } catch (error) {
      toast.error("Something went wrong in fetching employees!");
      console.log("Error:", error.message);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="mt-5">
          <p>
            <b>First Name: </b>
            {this.state.employee.firstName}
          </p>
          <p>
            <b>Last Name: </b>
            {this.state.employee.lastName}
          </p>
          <p>
            <b>Age: </b>
            {this.state.employee.age}
          </p>
          <p>
            <b>Date of Joining: </b>
            {moment(this.state.employee.dateOfJoining).utc().format("ll")}
          </p>
          <p>
            <b>Title: </b>
            {this.state.employee.title}
          </p>
          <p>
            <b>Department: </b>
            {this.state.employee.department}
          </p>
          <p>
            <b>Employee Type: </b>
            {this.state.employee.employeeType}
          </p>
          <p>
            <b>current Status: </b>
            {this.state.employee.currentStatus ? "Working" : "Retired"}
          </p>

          <div className="btn-add">
            <Link to="/employees" className="btn btn-warning px-4 mr-3">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EmployeeView);
