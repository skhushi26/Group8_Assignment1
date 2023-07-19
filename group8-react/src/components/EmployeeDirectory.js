import { Component, Fragment } from "react";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import { toast } from "react-toastify";

class EmployeeDirectory extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
    };
  }

  // async loadData() {
  //   try {
  //     if (this.state.employees.length > 0) {
  //       return;
  //     }
  //     const query = `
  //       query {
  //         employeeList {
  //           _id
  //           firstName
  //           lastName
  //           age
  //           dateOfJoining
  //           title
  //           department
  //           employeeType
  //           currentStatus
  //         }
  //       }
  //     `;

  //     const response = await fetch("/graphql", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ query }),
  //     });

  //     if (!response.ok) {
  //       toast.error("Request failed with status: " + response.status);
  //       throw new Error("Request failed with status: " + response.status);
  //     }

  //     const result = await response.json();

  //     if (result.data.employeeList.length === 0) {
  //       toast.info("Currently there are no employees added");
  //     }

  //     this.setState({ employees: result.data.employeeList });
  //     toast.success("Employees found successfully!");
  //   } catch (error) {
  //     toast.error("Something went wrong in fetching employees!");
  //     console.log("Error:", error.message);
  //   }
  // }

  // componentWillMount() {
  //   this.loadData();
  // }

  employeeAdd = (employee, form) => {
    fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee }),
    })
      .then(async (res) => {
        if (res.ok) {
          const result = await res.json();
          console.log("result: ", result);
          toast.success(result.message);
          this.setState({ employees: [...this.state.employees, result.createdEmployee] });
          form.reset();
          window.scrollTo(0, 0);
        } else {
          res.json().catch((err) => {
            toast.error(err.message);
            console.error("err", err.message);
          });
        }
      })
      .catch((error) => {
        toast.error(error);
        console.log("error", error?.message || "Something went wrong!");
      });
  };

  render() {
    return (
      <Fragment>
        <EmployeeSearch />
        <br />
        <EmployeeTable />
        <br />
        <EmployeeCreate employeeAdd={this.employeeAdd} />
      </Fragment>
    );
  }
}

export default EmployeeDirectory;
