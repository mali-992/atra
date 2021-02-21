import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
export default function UpdateCountry(props) {
  const { country } = props;
  const { updateHandler } = props;
  const nameRef = React.createRef();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateButtonHandler = () => {
    updateHandler(country.id, { name: nameRef.current.value });
    handleClose();
  };
  return (
    <>
      <Button
        variant="primary"
        size="sm"
        style={{ margin: "5px" }}
        onClick={handleShow}
      >
        update
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            defaultValue={country.name}
            ref={nameRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateButtonHandler}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
