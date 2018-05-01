import React from 'react';
import style from './App.css';
import sudoku from 'sudoku-umd';
import Board from '../components/Board';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        let newSudoku = sudoku.generate("easy")
        this.setState({
            initialBoard: newSudoku,
            board: newSudoku
        });
    }


    render() {   
        return (
            <div className="App">
                <h1>Sudoku</h1>
                <Board newGame={this.state.initialBoard} actualBoard={this.state.board.split("")}/>
                <div className="buttons">
                    <button>Check</button>
                    <button onClick={this.handleChange}>New Game</button>
                    <button>Solve</button>
                    <button>Restart</button>
                </div>
            </div>
        )
    }
}

export default App;