import { combineReducers } from "redux";
import viewReducer from "./view";
import resultsReducer from "./results";
import colorsReducer from "./colors";
import sizesReducer from "./sizes";

const rootReducer = combineReducers({
  viewReducer: viewReducer,
  resultsReducer: resultsReducer,
  colorsReducer: colorsReducer,
  sizesReducer: sizesReducer,
});

export default rootReducer;
