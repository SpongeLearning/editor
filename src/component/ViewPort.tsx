import React, { memo, useCallback, useContext, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/reducer";
import { selectAllFile } from "src/reducer/files";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { context as loadingManagerContext } from "./LoadingManager";
import View from "./View";

const ViewPort = memo((props: { id: string }) => {
    const { id } = props;
    const ref = useRef<THREE.Scene>(null);
    const loadingManager = useContext(loadingManagerContext);
    const [loader] = useState(new GLTFLoader(loadingManager));

    const files = useSelector((state: RootState) => selectAllFile(state.files));

    const addModel = useCallback(() => {
        files.forEach((file) => {
            if (file.path.endsWith(".gltf")) {
                loader.load(
                    file.path,
                    (gltf) => {
                        console.log("loaded", gltf);
                        ref.current?.add(gltf.scene);
                    },
                    (event) => {
                        console.log("loading", event);
                    },
                    (event) => {
                        console.log("load faild", event);
                    }
                );
            }
        });
    }, [files, loader]);

    return (
        <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
            <button onClick={addModel}>add model</button>
            <View ref={ref} id={id} />
        </div>
    );
});

export default ViewPort;
