import React, { createContext, FC, useState } from "react";
import * as THREE from "three";

export const context = createContext<THREE.LoadingManager>(
    new THREE.LoadingManager()
);

const LoadingManager: FC = (props) => {
    const { children } = props;
    const [manager] = useState(new THREE.LoadingManager());

    return <context.Provider value={manager}>{children}</context.Provider>;
};

export default LoadingManager;
