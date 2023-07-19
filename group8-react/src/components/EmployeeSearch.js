import React, { Component } from "react";
import { Button } from "react-bootstrap";

class EmployeeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEmployeeType: this.props.defaultType,
    };
  }

  handleEmployeeTypeChange = (event) => {
    const selectedEmployeeType = event.target.value;
    this.setState({ selectedEmployeeType });
    this.props.handleEmployeeTypeChange(selectedEmployeeType);
  };

  render() {
    return (
      <div className="mb-2 d-flex justify-content-between">
        <div>
          <label className="mr-1" htmlFor="employeeType">
            Employee Type:
          </label>
          <select
            id="employeeType"
            value={this.state.selectedEmployeeType}
            onChange={this.handleEmployeeTypeChange}
          >
            <option value="All">All</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>
        <Button as="a" className="btn" href="/employee/create">
          Create Employee
        </Button>
      </div>
    );
  }
}

export default EmployeeSearch;
