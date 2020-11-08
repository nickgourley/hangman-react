import React, { useState, useEffect } from "react";
import Hangman from "./Hangman";
import Keyboard from "./Keyboard";
import "../styles/Game.css";



const MAX_CHANCES = 6;

function getFrequencies(word) {
    var i;
    const letters = {};
    for(i = 0; i < word.length; i++) {
        if(word[i] in letters) {
            letters[word[i]].push(i);
        }
        else {
            letters[word[i]] = [i];
        }
    }
    return letters;
}

function getRandomWord() {
    const words = [
        "gap", "overlook", "contemporary", "differ", "achievement", "map",
        "horizon", "astonishing", "kinship", "response", "channel", "adult",
        "layout", "urgency", "contain", "soar", "pick", "transform", "bang",
        "related", "dribble", "arise", "check", "affair", "recover"
    ];
    return words[Math.floor(Math.random() * words.length)];
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: getRandomWord(),
            frequencies: null,
            solved: null,
            chances: MAX_CHANCES
        };
        this.makeGuess = this.makeGuess.bind(this);
        this.reset = this.reset.bind(this);
        
    }
    componentDidMount() {
        this.setState({
            frequencies: getFrequencies(this.state.word),
            solved: "_".repeat(this.state.word.length).split("")
        })
    }

    makeGuess() {
        if(this.state.chances > 0) {
            const letter = document.getElementById('letter-input').value.toLowerCase();
            if(letter in this.state.frequencies) {
                var positions = this.state.frequencies[letter];
                var newSolved = this.state.solved;
                positions.forEach(position => {
                    newSolved[position] = letter;
                });
                this.setState({ solved: newSolved })
            }
            else {
                this.setState({ chances: this.state.chances - 1})
            }
        }
    }

    reset() {
        console.log('reset')
    }
    
    render() {
        return (
            <div>
                <p>{this.state.chances} chances left</p>
                {(this.state.chances == 0) && <h3>GAME OVER!</h3>}
                <input type="text" id="letter-input" maxLength="1"></input>
                <button onClick={this.makeGuess}>
                    solve
                </button>
                <button onClick={this.reset}>reset</button>
                {this.state.solved && <p>{this.state.solved.join(" ")}</p>}
                <Hangman chances={this.state.chances}/>
            </div>
        );
    }
}

export default Game;