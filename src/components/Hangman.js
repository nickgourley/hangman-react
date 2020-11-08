import React, { useState } from "react";

const Hangman = (props) => {
    return (
    <div>
        {props.chances < 6 && <p>head</p>}
        {props.chances < 5 && <p>body</p>}
        {props.chances < 4 && <p>left arm</p>}
        {props.chances < 3 && <p>left leg</p>}
        {props.chances < 2 && <p>right arm</p>}
        {props.chances < 1 && <p>right leg</p>}
    </div>
    );
}

export default Hangman;