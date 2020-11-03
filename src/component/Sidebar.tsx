import React, { DragEvent, useCallback, useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { addFile } from "src/reducer/files";

import { context as loadingManagerContext } from "./LoadingManager";

const traverseFileTree = (entry: Entry): Promise<FileEntry[]> => {
    console.log("test test2");
    return new Promise((resolve, reject) => {
        if (entry.isFile) {
            resolve([entry as FileEntry]);
        } else if (entry.isDirectory) {
            // Get folder contents
            const dirReader = (entry as DirectoryEntry).createReader();
            dirReader.readEntries((entries) => {
                Promise.all(entries.map(traverseFileTree)).then((entries) =>
                    resolve(entries.flat())
                );
            });
        }
    });
};

const getFile = (fileEntry: FileEntry): Promise<File> => {
    return new Promise((resolve, reject) => {
        fileEntry.file((file) => {
            resolve(file);
        });
    });
};

// const getFiles = (fileEntries: FileEntry[]): Promise<File[]> => {
//     return new Promise((resolve, reject) => {
//         Promise.all(fileEntries.map(getFile)).then((files) => {
//             resolve(files);
//         });
//     });
// };

let blobs: { [key: string]: File } = {};

const Sidebar = () => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const loadingManager = useContext(loadingManagerContext);
    const onDrop = useCallback(
        async (event: DragEvent) => {
            console.log(event);
            event.preventDefault();
            var items = event.dataTransfer.items;
            for (let i = 0; i < items.length; i++) {
                // webkitGetAsEntry is where the magic happens
                const item = items[i].webkitGetAsEntry();
                if (item) {
                    const fileEntries = await traverseFileTree(item);

                    for (const fileEntry of fileEntries) {
                        const file = await getFile(fileEntry);
                        blobs[fileEntry.fullPath] = file;
                        dispatch(
                            addFile({
                                name: fileEntry.name,
                                path: fileEntry.fullPath,
                            })
                        );
                    }

                    loadingManager.setURLModifier((u) => {
                        const url = URL.createObjectURL(blobs[u]);
                        return url;
                    });
                }
            }
        },
        [dispatch, loadingManager]
    );

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
    }, []);

    return (
        <div>
            <div
                ref={ref}
                onDrop={onDrop}
                onDragOver={onDragOver}
                style={{ height: "200px", width: "200px" }}
            ></div>
        </div>
    );
};

export default Sidebar;
