import { combineReducers } from "redux";
import { formReducer } from "./formReducer";


export const rootReducer = combineReducers({
    formReducer: formReducer
});

export type RootState = ReturnType<typeof rootReducer>;
