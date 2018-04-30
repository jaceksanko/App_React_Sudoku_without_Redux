import React from 'react';
import Tile from './Tile';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }
   
    

    render() {
        console.log(this.props.newGame);
        
        let actBoard = this.props.actualBoard.split("");
        let board = actBoard.map(function(el, id){
            let idBoard = id;
            if (isNaN(el)) {
                return (<label key={id} >
                    <Tile inputValue={el} dis={false}/>
                    </label>
                )  
            }
            else {
            return (<label key={id} >
                <Tile inputValue={el} dis={true} />
                </label>
            )
            }
        })
        return (
            board
        )

    }
}

export default Board