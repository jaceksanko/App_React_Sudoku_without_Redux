import React from 'react';
import style from './App.css';
import sudoku from 'sudoku-umd';
import Board from '../components/Board';
import swal from 'sweetalert';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: '',
            tempBoard: '',
            resetTile: false
        };
        this.handleNewGame = this.handleNewGame.bind(this);
        this.addValueTile = this.addValueTile.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.hendleRestart = this.hendleRestart.bind(this);
        this.handleSolve = this.handleSolve.bind(this);
    }

    
    handleNewGame() {
        this.hendleRestart()
        let newSudoku = sudoku.generate("easy")
        this.setState({
            initialBoard: newSudoku,
            board: newSudoku,
            tempBoard: newSudoku,
            resetTile: true,
            solve: ''
        });
    };
    
    addValueTile(valueTile) {
            let boardArray = this.state.tempBoard.split("");
            boardArray[valueTile.id] = valueTile.value;
            let boardString = boardArray.join('');
            this.setState({
                tempBoard: boardString,
                resetTile: false
            })
        }

    handleSolve() {
        let getTempBoard = this.state.tempBoard;
        let board = this.state.initialBoard;
        let solve = sudoku.solve(getTempBoard);
        if (solve === false || getTempBoard === board) {
            swal("Przykto mi.", "Sudoku nie da się rozwiązać. Gdzieś jest błąd. Spróbuj nową grę.", "error");
            this.handleNewGame()
        }
        
        else {
            this.setState({
                board: getTempBoard
            })
            swal("Gratuluję!", "Sudoku jest poprawnie rozwiązane", "success");
            
        }
        
    }

    handleCheck() {
        let getTempBoard = this.state.tempBoard;
        let board = this.state.initialBoard;
        let solve = sudoku.solve(getTempBoard);
        if (solve === false || getTempBoard === board) {
            swal("Gdzieś masz błąd.", "Próbuj dalej.", "warning");
        }
        else {
            swal("Gratuluję!", "Sudoku jest poprawnie rozwiązane", "success");
        }
    }
    
    hendleRestart() {
        this.setState({
            board: this.state.initialBoard,
            tempBoard: this.state.initialBoard,
            resetTile: true
        })
    }
    
    render() {   
        return (
            <div className="App">
                <h1>Sudoku</h1>
                <Board newGame={this.state.initialBoard.split("")} actualBoard={this.state.board.split("")} addValueTile={this.addValueTile} resetTile={this.state.resetTile} />
                <div className="buttons">
                    <button onClick={this.handleCheck}>Check</button>
                    <button onClick={this.handleNewGame}>New Game</button>
                    <button onClick={this.handleSolve}>Solve</button>
                    <button onClick={this.hendleRestart}>Restart</button>
                </div>
            </div>
        )
    }
}

export default App;