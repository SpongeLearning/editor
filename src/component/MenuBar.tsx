import React from "react";

import MenuItem from "./MenuItem";

const MenuBar = () => {
    return (
        <div style={{ backgroundColor: "#000000bb", display: "flex" }}>
            <MenuItem name="File" />
        </div>
    );
};

export default MenuBar;
