import Select from "react-select";
// import {  useState } from "react";


function SelectForm(props) {
  // const [selectedOption, setSelectedOption] = useState(null);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "black",
    }),
    control: (base) => ({
      ...base,
      border: "1px solid gray !important",
      boxShadow: `1px 1px 1px 1px ${(props.type && props.type.length===0 ? "rgb(149, 11, 11)":"gray")||"gray"} inset!important`,
      fontSize: "16px",
      fontWeight: "500",
      minHeight: `${props.height} !important`,
      maxHeight: `${props.height}`,
      height: `38px`,
      "&:hover": {
        border: "1px solid gray !important",
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 200ms";
      return { ...provided, opacity, transition };
    },
  };

  return (
    <Select
      className={`${props.class} placeholder:text-[2px]`}
      options={props.options}
      placeholder={props.placeholder}
      styles={customStyles}
      isDisabled={props.isDisabled}
      onChange={props.setSelectedOption}
     isMulti= {props.isMulti}
    />
  );
}

export default SelectForm;
