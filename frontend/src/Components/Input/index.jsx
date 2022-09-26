import classNames from "classnames/bind";
import style from "./input.module.scss";
const cx = classNames.bind(style);

function Input(props) {
  return (
    <input
      defaultValue={props.value}
      ref={props.refs}
      style={props.style}
      className={`${props.className} ${cx("input")} placeholder:text-sm`}
      type={props.type}
      tabIndex={props.tabindex}
      placeholder={props.placeholder}
      onChange={(e) => {
        props.handlOnChange(e.target.value);
      }}
      onKeyDown = {(e)=>{props.onKeyDown(e)}}
    ></input>
  );
}

export default Input;
