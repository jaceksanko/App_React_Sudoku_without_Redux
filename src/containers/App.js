import React from 'react';
import style from './App.css';
import sudoku from 'sudoku-umd';
import Board from '../components/Board';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: '',
            tempBoard: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addValueTile = this.addValueTile.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }
    handleChange(event) {
        let newSudoku = sudoku.generate("easy")
        this.setState({
            initialBoard: newSudoku,
            board: newSudoku,
            tempBoard: newSudoku
        });
    };
    
    addValueTile(valueTile) {
            let boardArray = this.state.tempBoard.split("");
            boardArray[valueTile.id] = valueTile.value;
            let boardString = boardArray.join('');
            this.setState({
                tempBoard: boardString
            })
        }

    handleCheck(){
        let getTempBoard = this.state.tempBoard;
        this.setState({
            board: getTempBoard
        })
    }
        
    
    


    render() {   
        return (
            <div className="App">
                <h1>Sudoku</h1>
                <Board newGame={this.state.initialBoard.split("")} actualBoard={this.state.board.split("")} addValueTile={this.addValueTile}/>
                <div className="buttons">
                    <button onClick={this.handleCheck}>Check</button>
                    <button onClick={this.handleChange}>New Game</button>
                    <button>Solve</button>
                    <button>Restart</button>
                </div>
            </div>
        )
    }
}

export default App;