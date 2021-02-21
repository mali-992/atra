import React from "react";
import { Button } from "react-bootstrap";
export default function AddCountry(props) {
  const { addHandler } = props;
  const nameRef = React.createRef();
  const addButtonHandler = () => {
    const name = nameRef.current.value;
    if (name) {
      addHandler({ name });
    }
  };
  return (
    <div>
      <label htmlFor="name" style={{ marginLeft: "20px" }}>
        <b>Add country:</b>
      </label>
      <input
        type="text"
        name="name"
        ref={nameRef}
        placeholder="country name"
        style={{ marginLeft: "10px" }}
      />
      <Button
        className="btn-sm"
        style={{ margin: "5px", marginBottom: "10px" }}
        onClick={addButtonHandler}
      >
        add
      </Button>
    </div>
  );
}
