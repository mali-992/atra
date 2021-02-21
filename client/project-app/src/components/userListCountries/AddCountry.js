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
      add country:{"  "}
      <input type="text" name="name" ref={nameRef} placeholder="country name" />
      <Button className="btn-sm" onClick={addButtonHandler}>
        add
      </Button>
    </div>
  );
}
