import {
    DIRECTION,
    INode,
    Layout,
    NODE_TYPE,
    Provider,
} from "@idealjs/layout-manager";
import { makeStyles } from "@material-ui/styles";
import React from "react";

import Sidebar from "./Sidebar";
import TextEditor from "./TextEditor";
import ViewPort from "./ViewPort";

const nodes: INode[] = [
    {
        id: "root",
        type: NODE_TYPE.LAYOUT_NODE,
        parentId: "",
        direction: DIRECTION.ROW,
        children: ["A", "B", "C"],
    },
    {
        id: "A",
        type: NODE_TYPE.WIDGET_NODE,
        parentId: "root",
        children: ["A_A"],
    },
    {
        id: "A_A",
        type: NODE_TYPE.PANEL,
        parentId: "A",
        Page: () => <Sidebar />,
    },
    {
        id: "B",
        type: NODE_TYPE.WIDGET_NODE,
        parentId: "root",
        children: ["B_A"],
    },
    {
        id: "B_A",
        type: NODE_TYPE.PANEL,
        parentId: "B",
        Page: () => <TextEditor />,
    },
    {
        id: "C",
        type: NODE_TYPE.WIDGET_NODE,
        parentId: "root",
        children: ["C_A"],
    },
    {
        id: "C_A",
        type: NODE_TYPE.PANEL,
        parentId: "C",
        Page: () => <ViewPort id={"view"} />,
    },
];

const useStyle = makeStyles({
    root: {
        flex: 1,
        height: "100%",
        width: "100%",
    },
});

const Body = () => {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            <Provider value={nodes}>
                <Layout nodeId="root" />
            </Provider>
        </div>
    );
};

export default Body;
