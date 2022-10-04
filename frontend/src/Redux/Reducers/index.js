import SetForm from "./setform";
import SetUpdate from "./setupdate";

import { combineReducers } from "redux";
 const rootReducer = combineReducers({
   form: SetForm,
   update: SetUpdate,
 });
export default rootReducer;