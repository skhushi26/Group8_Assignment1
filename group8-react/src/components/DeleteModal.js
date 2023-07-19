import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DeleteModal extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.flag} onHide={this.props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete employee?</Modal.Body>
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

export default DeleteModal;
