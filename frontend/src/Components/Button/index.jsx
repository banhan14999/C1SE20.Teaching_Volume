import { Button } from "@mui/material";

function Buttons(props) {
  return (
    <Button
      size={props.size}
      variant="contained"
      className={props.class}
      style={{
        width: props.width,
        backgroundColor: props.bgcolor,
        fontWeight: "bold",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}

export default Buttons;
