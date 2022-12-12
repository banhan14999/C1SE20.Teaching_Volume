import { Button } from "@mui/material";
function Buttons(props) {

  return (
    <Button
      ref={props.refs}
      size={props.size}
      variant="contained"
      sx={{
        ":hover": {
          // bgcolor: " !important",
          opacity: 0.8,
        },
      }}
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
