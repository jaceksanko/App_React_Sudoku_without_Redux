import React from 'react';
import sudoku from 'sudoku-umd';
import Board from '../components/Board';
import swal from 'sweetalert';
import Popup from "reactjs-popup";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard: '',
            board: '',
            tempBoard: '',
            resetTile: false
        };
        this.handleNewGameEasy = this.handleNewGameEasy.bind(this);
        this.handleNewGameMedium = this.handleNewGameMedium.bind(this);
        this.handleNewGameHard = this.handleNewGameHard.bind(this);
        this.addValueTile = this.addValueTile.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.hendleRestart = this.hendleRestart.bind(this);
        this.handleSolve = this.handleSolve.bind(this);
        this.hendleSave = this.hendleSave.bind(this);
        this.hendleLoad = this.hendleLoad.bind(this);
    }

    hendleSave() {
        localStorage.setItem('initialBoard', this.state.initialBoard);
        localStorage.setItem('board', this.state.board);
        localStorage.setItem('tempBoard', this.state.tempBoard);
        localStorage.setItem('resetTile', this.state.resetTile);
    }

    hendleLoad() {
        let saveInitialBoard = localStorage.getItem('initialBoard');
        let saveBoard = localStorage.getItem('board');
        let saveTempBoard = localStorage.getItem('tempBoard');
        let saveresetTile = localStorage.getItem('resetTile')
        console.log(saveBoard)
        this.setState({
            initialBoard: saveInitialBoard,
            board: saveBoard,
            tempBoard: saveTempBoard,
            resetTile: saveresetTile
        })       
    }

    
    handleNewGameEasy() {
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
    handleNewGameMedium() {
        this.hendleRestart()
        let newSudoku = sudoku.generate("medium")
        this.setState({
            initialBoard: newSudoku,
            board: newSudoku,
            tempBoard: newSudoku,
            resetTile: true,
            solve: ''
        });
    };
    handleNewGameHard() {
        this.hendleRestart()
        let newSudoku = sudoku.generate("hard")
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
            this.hendleRestart()
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
                <div className="board">
                    <Board newGame={this.state.initialBoard.split("")} actualBoard={this.state.board.split("")} addValueTile={this.addValueTile} resetTile={this.state.resetTile} tempBoard={this.state.tempBoard.split("")} />
                </div>
               
                <div className="buttons">
                    <button onClick={this.handleCheck}>Check</button>
                    
                    <Popup trigger={<button className="button"> New Game </button>} modal>
                        {close => (
                        <div className="modal">
                            <a className="close" onClick={close}>
                            &times;
                            </a>
                            <div className="header"> Game level </div>
                            <div className="content">
                            {" "}
                            Chose game level of sudoku <br/>
                            Number of given squares: <br/>
                            <ul>
                                <li>easy:         62</li>
                                <li>medium:       53</li>
                                <li>hard:         44</li>
                            </ul>
                            
                            
                            
                            
                            </div>
                            <div className="actions">
                                <button onClick={() => {
                                    this.handleNewGameEasy()
                                    close()
                                    }}>Easy</button>
                                <button onClick={() => {
                                    this.handleNewGameMedium()
                                    close()
                                    }}>Medium</button>
                                <button onClick={() => {
                                    this.handleNewGameHard()
                                    close()
                                    }}>Hard</button>
                                <button
                                    className="button"
                                    onClick={() => {
                                    console.log('modal closed ')
                                    close()
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        )}
                    </Popup>
                    <button onClick={this.handleSolve}>Solve</button>
                    <button onClick={this.hendleRestart}>Restart</button>
                    <button onClick={this.hendleSave}>Save Game</button>
                    <button onClick={this.hendleLoad}>Load Save</button>
                </div>
            </div>
        )
    }
}

export default App;