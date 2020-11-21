import { editor as mEditor } from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";

const TextEditor = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [editor, setEditor] = useState<mEditor.IStandaloneCodeEditor>();
    useEffect(() => {
        const editor = mEditor.create(ref.current!);
        setEditor(editor);
    }, []);

    useEffect(() => {
        editor?.layout();
    });

    return (
        <div ref={ref} style={{ height: "100%", width: "100%" }}>
            TextEditor
        </div>
    );
};

export default TextEditor;
