import { SET_FORM } from "../Constant/index";

export const ShowForm = (data) => {
  return {
    type: SET_FORM,
    payload:data
  };
};
