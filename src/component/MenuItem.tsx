import React from "react";

const MenuItem = (props: { name: string }) => {
    const { name } = props;
    return <div style={{ color: "white" }}>{name}</div>;
};

export default MenuItem;
