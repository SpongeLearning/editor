import React, { useCallback } from "react";

const getFiles = async (
    dirHandle: FileSystemDirectoryHandle,
    recursive: boolean = false,
    path: string = dirHandle.name
): Promise<File[]> => {
    const dirs = [];
    const files = [];
    for await (const entry of dirHandle.values()) {
        const nestedPath = `${path}/${entry.name}`;
        if (entry.kind === "file") {
            files.push(
                entry.getFile().then((file: File) =>
                    Object.defineProperty(file, "webkitRelativePath", {
                        configurable: true,
                        enumerable: true,
                        get: () => nestedPath,
                    })
                )
            );
        } else if (entry.kind === "directory" && recursive) {
            dirs.push(getFiles(entry, recursive, nestedPath));
        }
    }
    return [...(await Promise.all(dirs)).flat(), ...(await Promise.all(files))];
};

const FileManager = () => {
    const onClick = useCallback(async () => {
        const dirHandle: FileSystemDirectoryHandle = await (window as any).showDirectoryPicker();
        console.log(dirHandle);
        const files = await getFiles(dirHandle, true);
        console.log(files);
    }, []);
    return (
        <div>
            <button onClick={onClick}>createWorkSpace</button>
            <button>add Model</button>
        </div>
    );
};

export default FileManager;
