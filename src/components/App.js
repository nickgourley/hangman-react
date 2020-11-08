import React, { useState } from "react";
import Game from "./Game";

const App = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <Game />
            
        </div>
    );
}

export default App;