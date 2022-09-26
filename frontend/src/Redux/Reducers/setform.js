import { SET_FORM } from "../Constant/index";

const initState = { form: "Info webpart" };
export default function SetForm(state = initState, action) {  
  // console.log(action);
  switch (action.type) {
    case SET_FORM:
      return {
        ...state,
        form: action.payload
      };
    default:
      return state;
  }
};
