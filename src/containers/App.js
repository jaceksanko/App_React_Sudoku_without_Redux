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
        this.handleRestart = this.handleRestart.bind(this);
        this.handleSolve = this.handleSolve.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    handleSave() {
        localStorage.setItem('initialBoard', this.state.initialBoard);
        localStorage.setItem('board', this.state.board);
        localStorage.setItem('tempBoard', this.state.tempBoard);
        localStorage.setItem('resetTile', this.state.resetTile);
        swal("Stan gry został zapisany","", "success");
    }

    handleLoad() {
        let saveInitialBoard = localStorage.getItem('initialBoard');
        let saveBoard = localStorage.getItem('board');
        let saveTempBoard = localStorage.getItem('tempBoard');
        let saveresetTile = localStorage.getItem('resetTile')
        this.setState({
            initialBoard: saveInitialBoard,
            board: saveBoard,
            tempBoard: saveTempBoard,
            resetTile: saveresetTile
        })
        swal("Zapisany stan gry został wczytany","", "success");     
    }

    newGame(gameLevel) {
        this.handleRestart()
        let newSudoku = sudoku.generate(gameLevel)
        this.setState({
            initialBoard: newSudoku,
            board: newSudoku,
            tempBoard: newSudoku,
            resetTile: true,
            solve: ''
        });
    }


    handleNewGameEasy() {        
        this.newGame("easy");
    };

    handleNewGameMedium() {
        this.newGame("medium");  
    };

    handleNewGameHard() {
        this.newGame("hard");
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

    solveCheck(solveFalse, solveCheck) {
        let getTempBoard = this.state.tempBoard;
        let board = this.state.initialBoard;
        let solve = sudoku.solve(getTempBoard);
        if (solve === false || getTempBoard === board) {
            swal(solveFalse.head, solveFalse.text, solveFalse.type);
            this.handleRestart()
        }
        else {
            solveCheck
            swal("Gratuluję!", "Sudoku jest poprawnie rozwiązane", "success");
            
        }
    }

    handleSolve() {
        let solveFalse = {
            head: "Przykro mi.", 
            text: "Sudoku nie da się rozwiązać. Gdzieś jest błąd. Spróbuj nową grę.",
            type: "error"};
        let solveCheck = this.setState({
                board: this.state.tempBoard
            })
        this.solveCheck(solveFalse, solveCheck);
        
    }

    handleCheck() {
        let solveFalse = {
            head: "Gdzieś masz błąd.", 
            text: "Próbuj dalej.",
            type: "warning"};
        
        this.solveCheck(solveFalse);
        
    }
    
    handleRestart() {
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
                    <button onClick={this.handleRestart}>Restart</button>
                    <button onClick={this.handleSave}>Save Game</button>
                    <button onClick={this.handleLoad}>Load Save</button>
                </div>
            </div>
        )
    }
}

export default App;