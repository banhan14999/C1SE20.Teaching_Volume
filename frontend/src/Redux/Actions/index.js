import { SET_FORM, SET_UPDATE,DATA_UPDATE } from "../Constant/index";

export const ShowForm = (data) => {
  return {
    type: SET_FORM,
    payload:data
  };
};

export const SetUpdate = (data) => {
  return {
    type: SET_UPDATE,
    payload: data,
  };
};
export const DataUpdate = (data) => {
  return {
    type: DATA_UPDATE,
    payload: data,
  };
};
