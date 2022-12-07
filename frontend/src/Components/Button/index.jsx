import { Button } from "@mui/material";
import React, { Component }  from 'react';
function Buttons(props) {
  return (
    <Button
      ref={props.refs}
      size={props.size}
      variant="contained"
      className={props.class}
      style={{
        width: props.width,
        backgroundColor: props.bgcolor,
        fontWeight: props.weight || "bold",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}

export default Buttons;
