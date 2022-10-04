import { SET_UPDATE } from "../Constant/index";
const initState = { update: "Info webpart" };
export default function Setupdate(state = initState, action) {
  switch (action.type) {
    case SET_UPDATE:
      return {
        ...state,
        update: action.payload,
      };
    default:
      return state;
  }
}
