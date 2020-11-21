import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/reducer";
import { selectAllFile } from "src/reducer/files";
import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { context as loadingManagerContext } from "./LoadingManager";
import View from "./View";

const ViewPort = (props: { id: string }) => {
    const { id } = props;
    const ref = useRef<{ scene: Scene; layoutUpdate: () => void }>(null);
    const loadingManager = useContext(loadingManagerContext);
    const [loader] = useState(new GLTFLoader(loadingManager));

    const files = useSelector((state: RootState) => selectAllFile(state.files));

    useEffect(() => {
        ref.current?.layoutUpdate();
    });

    const addModel = useCallback(() => {
        files.forEach((file) => {
            if (file.path.endsWith(".gltf")) {
                loader.load(
                    file.path,
                    (gltf) => {
                        console.log("loaded", gltf);
                        ref.current?.scene.add(gltf.scene);
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
};

export default ViewPort;
