import React from "react";

import Body from "./component/Body";

function App() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Body />
        </div>
    );
}

export default App;
