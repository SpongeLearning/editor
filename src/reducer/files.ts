import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export interface IFile {
    name: string;
    path: string;
}

const adapter = createEntityAdapter<IFile>({
    selectId: (layout) => layout.path,
});

const slice = createSlice({
    name: "files",
    initialState: adapter.getInitialState(),
    reducers: {
        remove: adapter.removeOne,
        add: adapter.addOne,
        addMany: adapter.addMany,
        update: adapter.updateOne,
        updateMany: adapter.updateMany,
    },
});

export const {
    remove: removeFile,
    add: addFile,
    addMany: addFiles,
    update: updateFile,
    updateMany: updateFiles,
} = slice.actions;

export default slice.reducer;

export const { selectAll: selectAllFile } = adapter.getSelectors();
