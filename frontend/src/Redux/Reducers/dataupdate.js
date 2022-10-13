import { DATA_UPDATE } from "../Constant/index";
const initState = { data:[]};
export default function DataUpdate(state = initState, action) {
  switch (action.type) {
    case DATA_UPDATE:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
