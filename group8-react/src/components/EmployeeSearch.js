import { Component } from "react";
import { Form } from "react-bootstrap";

class EmployeeSearch extends Component {
  render() {
    return (
      <div className="search-emp my-3 mx-5">
        <Form.Group controlId="formSearch">
          <Form.Control type="text" name="search" placeholder="Search..." />
        </Form.Group>
      </div>
    );
  }
}

export default EmployeeSearch;
