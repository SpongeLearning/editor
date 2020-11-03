interface Entry {
    copyTo: any;
    filesystem: DOMFileSystem;
    fullPath: string;
    getMetadata: any;
    getParent: any;
    isFile: boolean;
    isDirectory: boolean;
    moveTo: any;
    name: string;
    remove: any;
    toURL: any;
}

interface DirectoryReader {
    readEntries: (callbackfn: (entries: Entry[]) => any) => void;
}

interface DOMFileSystem {
    name: string;
    root: DirectoryEntry;
}

interface FileEntry extends Entry {
    createWriter: any;
    file: (callback: (file: File) => any) => void;
}

interface DirectoryEntry extends Entry {
    createReader: () => DirectoryReader;
    getDirectory: any;
    getFile: any;
}
