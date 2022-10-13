import DataUpdate from "./dataupdate";
import SetForm from "./setform";
import SetUpdate from "./setupdate";
import { combineReducers } from "redux";
 const rootReducer = combineReducers({
   form: SetForm,
   update: SetUpdate,
   dtupdate: DataUpdate,
 });
export default rootReducer;