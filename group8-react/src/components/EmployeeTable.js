import { Component } from "react";
import EmployeeRow from "./EmployeeRow";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import EmployeeSearch from "./EmployeeSearch";
import DeleteModal from "./DeleteModal";
import withRouter from "./Router/withRouter";

class EmployeeTable extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      isDeleteModalOpen: false,
      selectedEmployee: "",
      employee: {},
    };
  }

  async loadData(employeeType) {
    try {
      this.props.history(`/employees/${employeeType}`, { replace: true });
      const query = `
        query {
          employeeList(employeeType: "${employeeType}") {
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

      const response = await fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        toast.error("Request failed with status: " + response.status);
        throw new Error("Request failed with status: " + response.status);
      }

      const result = await response.json();

      if (result.data.employeeList.length === 0) {
        toast.info("Currently there are no employees added");
      }

      this.setState({ employees: result.data.employeeList });
    } catch (error) {
      toast.error("Something went wrong in fetching employees!");
      console.log("Error:", error.message);
    }
  }

  componentWillMount() {
    this.loadData(this?.props?.params?.type || "All"); // Load all employees by default
  }

  handleEmployeeTypeChange = (employeeType) => {
    this.loadData(employeeType);
  };

  deleteEmployee = async () => {
    try {
      const response = await fetch(
        `/api/employees/${this.state.selectedEmployee}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        toast.error("Request failed with status: " + response.status);
        throw new Error("Request failed with status: " + response.status);
      }

      const result = await response.json();

      if (result.errors) {
        toast.error(result.errors[0].message);
        throw new Error(result.errors[0].message);
      }

      toast.success("Employee deleted successfully!");
      this.setState({ isDeleteModalOpen: false, selectedEmployee: "" });
      this.loadData(this?.props?.params?.type || "All");
    } catch (error) {
      toast.error(
        "Something went wrong while deleting the employee. Please try again!"
      );
      console.log("Error:", error.message);
      this.setState({ isDeleteModalOpen: false, selectedEmployee: "" });
      throw error;
    }
  };

  handleDeleteModal = (id) => {
    this.setState({ isDeleteModalOpen: true, selectedEmployee: id });
  };

  handleCloseModal = () => {
    this.setState({ isDeleteModalOpen: false, selectedEmployee: "" });
  };

  render() {
    const employees = this.state.employees.map((employee) => {
      return (
        <EmployeeRow
          key={employee._id}
          employee={employee}
          handleDeleteModal={this.handleDeleteModal}
        />
      );
    });

    return (
      <div className="container mt-4">
        <EmployeeSearch
          handleEmployeeTypeChange={this.handleEmployeeTypeChange}
          defaultType={this.props?.params?.type || "All"}
        />
        <Table striped bordered hover>
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
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No employees found!
                </td>
              </tr>
            ) : (
              employees
            )}
          </tbody>
        </Table>

        <DeleteModal
          flag={this.state.isDeleteModalOpen}
          handleOkay={this.deleteEmployee}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}

export default withRouter(EmployeeTable);
