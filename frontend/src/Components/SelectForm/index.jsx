import Select from "react-select";
import React, { Component }  from 'react';
function SelectForm(props) {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      background: "white",
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "black",
      "&:hover": {
        background: "rgb(218, 220, 221)",
      },
    }),
    control: (base) => ({
      ...base,
      border: "1px solid gray !important",
      boxShadow: `1px 1px 1px 1px ${
        (props.type && props.type.length === 0 ? "rgb(149, 11, 11)" : "gray") ||
        "gray"
      } inset!important`,
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
      ref={props.refSelect}
      className={`${props.class}`}
      options={props.options}
      placeholder={props.placeholder}
      styles={customStyles}
      isDisabled={props.isDisabled}
      onChange={props.setSelectedOption}
      isMulti={props.isMulti}
      isClearable={props.clearable}
      defaultValue={props.defaultValue}
    />
  );
}

export default SelectForm;
