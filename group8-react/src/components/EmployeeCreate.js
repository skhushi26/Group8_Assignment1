import { Component } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import withRouter from "./Router/withRouter";
import { Link } from "react-router-dom";

class EmployeeCreate extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        firstName: "",
        lastName: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
      },
    };
  }

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
          toast.success(result.message);
          form.reset();
          this.props.history(`/employees/${employee.employeeType}`);
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

  handleSubmit = (e) => {
    e.preventDefault();
    const form = document.forms.employeeAdd;

    // Validate required fields
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const age = form.age.value.trim();
    const dateOfJoining = form.dateOfJoining.value;
    const title = form.title.value;
    const department = form.department.value;
    const employeeType = form.employeeType.value;

    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(firstName)) {
      errors.firstName = "First name should only contain letters and spaces.";
    }

    if (!lastName) {
      errors.lastName = "Last name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(lastName)) {
      errors.lastName = "Last name should only contain letters and spaces.";
    }

    if (!age) {
      errors.age = "Age is required.";
    } else if (!/^[0-9]*$/.test(age)) {
      errors.age = "Age must be a number.";
    } else if (age < 20 || age > 70) {
      errors.age = "Age should be a number between 20 and 70.";
    }

    if (!dateOfJoining) {
      errors.dateOfJoining = "Date of joining is required.";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfJoining)) {
      errors.dateOfJoining =
        "Date of joining should be in the format 'YYYY-MM-DD'.";
    } else {
      const parts = dateOfJoining.split("-");
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const validDate =
        !isNaN(year) &&
        !isNaN(month) &&
        !isNaN(day) &&
        month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= 31;
      if (!validDate) {
        errors.dateOfJoining = "Date of joining should be a valid date.";
      }
    }

    if (!title) {
      errors.title = "Title is required.";
    }

    if (!department) {
      errors.department = "Department is required.";
    }

    if (!employeeType) {
      errors.employeeType = "Employee type is required.";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: new Date(form.dateOfJoining.value),
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: form.currentStatus.value === "true",
    };
    this.employeeAdd(employee, form);
  };

  handleChange = (e) => {
    const { name } = e.target;
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Form
          name="employeeAdd"
          onSubmit={this.handleSubmit}
          className="employee-create-form my-3">
          <Form.Group controlId="formFirstName">
            <Form.Control
              type="text"
              name="firstName"
              placeholder="FirstName"
              onChange={this.handleChange}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="formFirstName">
            <Form.Control
              type="text"
              name="lastName"
              placeholder="LastName"
              onChange={this.handleChange}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="formFirstName">
            <Form.Control
              type="text"
              name="age"
              placeholder="Age"
              onChange={this.handleChange}
              isInvalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="formFirstName">
            <Form.Control
              type="date"
              name="dateOfJoining"
              onChange={this.handleChange}
              isInvalid={!!errors.dateOfJoining}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dateOfJoining}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="formFirstName">
            <Form.Control
              as="select"
              name="title"
              onChange={this.handleChange}
              isInvalid={!!errors.title}>
              <option value="">Select Title</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="VP">VP</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="formFirstName">
            <Form.Control
              as="select"
              name="department"
              onChange={this.handleChange}
              isInvalid={!!errors.department}>
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.department}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group controlId="formFirstName">
            <Form.Control
              as="select"
              name="employeeType"
              onChange={this.handleChange}
              isInvalid={!!errors.employeeType}>
              <option value="">Select Employee Type</option>
              <option value="FullTime">FullTime</option>
              <option value="PartTime">PartTime</option>
              <option value="Contract">Contract</option>
              <option value="Seasonal">Seasonal</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.employeeType}
            </Form.Control.Feedback>
          </Form.Group>
          <br />
          <Form.Group className="employee-radio-btn">
            <Form.Check
              type="radio"
              id="working"
              name="currentStatus"
              value={true}
              label="Working"
              defaultChecked></Form.Check>

            <Form.Check
              type="radio"
              id="retired"
              name="currentStatus"
              value={false}
              label="Retired"></Form.Check>
          </Form.Group>

          <div className="btn-add">
            <Link to="/employees" className="btn btn-warning px-4 mr-3">
              Cancel
            </Link>

            <button className="btn btn-dark px-4">Add</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(EmployeeCreate);
