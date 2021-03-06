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
        "related", "dribble", "arise", "check", "affair", "recover", "user",
        "pocket", "engine", "photocopy", "outer", "thigh", "metal", "heel", "outfit",
        "coalition", "lunch", "despair", "operation", "suffer", "pack", "warm", "know", "mole",
        "freckle", "microphone", "stable", "swear", "mail", "replacement", "river", "spread",
        "dive", "opposed", "weakness", "victory", "tap", "can", "method", "structure", "deficiency",
        "torture", "woman", "enthusiasm", "threat", "waterfall", "father", "drop", "code", "nap",
        "haircut", "like", "variant", "mud", "ghost", "deport"
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
            chances: MAX_CHANCES,
            guesses: [],
            feedback: "Guess a letter to begin"
        };
        this.makeGuess = this.makeGuess.bind(this);
        this.reset = this.reset.bind(this);
        
    }
    componentDidMount() {
        this.setState({
            frequencies: getFrequencies(this.state.word),
            solved: "_".repeat(this.state.word.length).split("")
        })
        console.log(this.state.word);   
    }

    makeGuess() {
        if(this.state.chances > 0) {
            const letter = document.getElementById('letter-input').value.toLowerCase();
            document.getElementById('letter-input').value="";
            const guesses = this.state.guesses;
            console.log(guesses)
            if(guesses.includes(letter)) {
                this.setState({ feedback: letter + " has already been guessed" });
            }
            else if(letter == "") {
                this.setState({ feedback: "You must enter a character to guess"});
            }
            else {
                guesses.push(letter);
                this.setState({ guesses: guesses });
            }
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
        document.getElementById('letter-input').value="";
        this.setState({
            word: getRandomWord(),
            chances: MAX_CHANCES,
        }, () => {
            console.log(this.state.word);
            this.setState({
                frequencies: getFrequencies(this.state.word),
                solved: "_".repeat(this.state.word.length).split(""),
                guesses: [],
                feedback: "Guess a letter to begin"
            })
        });
    }
    
    render() {
        return (
            <div>
                <p>{this.state.chances} chances left</p>
                {(this.state.chances == 0) && <div><h3>GAME OVER!</h3><p>The word was: {this.state.word}</p></div>}
                <input type="text" id="letter-input" maxLength="1"></input>
                <button onClick={this.makeGuess}>
                    solve
                </button>
                <button onClick={this.reset}>reset</button>
                {this.state.solved && <p>{this.state.solved.join(" ")}</p>}
                <p>Guessed Letters: {(this.state.guesses.length > 0) &&  this.state.guesses.join(" ")}</p>
                {this.state.feedback && <p>{this.state.feedback}</p>}
                <Hangman chances={this.state.chances}/>
            </div>
        );
    }
}

export default Game;