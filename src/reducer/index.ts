import { combineReducers } from "@reduxjs/toolkit";

import files from "./files";

const rootReducer = combineReducers({
    files,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
