import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";

class ViewModal extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.flag} onHide={this.props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Employee Detaiils</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>First Name: </b>
              {this.props.employee.firstName}
            </p>
            <p>
              <b>Last Name: </b>
              {this.props.employee.lastName}
            </p>
            <p>
              <b>Age: </b>
              {this.props.employee.age}
            </p>
            <p>
              <b>Date of Joining: </b>
              {moment(this.props.employee.dateOfJoining).utc().format("ll")}
            </p>
            <p>
              <b>Title: </b>
              {this.props.employee.title}
            </p>
            <p>
              <b>Department: </b>
              {this.props.employee.department}
            </p>
            <p>
              <b>Employee Type: </b>
              {this.props.employee.employeeType}
            </p>
            <p>
              <b>current Status: </b>
              {this.props.employee.currentStatus ? "Working" : "Retired"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleCloseModal}>
              Close
            </Button>
            <Button variant="secondary" onClick={this.props.handleOkay}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ViewModal;
