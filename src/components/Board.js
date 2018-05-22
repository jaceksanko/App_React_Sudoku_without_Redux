import React from 'react';
import Tile from './Tile';


class Board extends React.Component { 
    
    render() {
        let addValueTile = this.props.addValueTile
        let actBoard = this.props.actualBoard;
        let resetTile = this.props.resetTile;
        let afterRestartTile = this.props.afterRestartTile
        let tempBoard = this.props.tempBoard
        let classOpen = 'open';
        let classClose = 'close';
        let board = actBoard.map(function(el, id){
            
            if (isNaN(el)) {
                return (
                    <Tile key={id} style={classOpen}  idBoard={id} inputValue={tempBoard[id]} dis={false} addValueTile={addValueTile} resetTile={resetTile} /> 
                )  
            }
            else {
                return (
                    <Tile key={id} style={classClose} idBoard={id} inputValue={el} dis={true} addValueTile={addValueTile}/>  
                )
            }
        })
        return (
            
            board
        )

    }
}

export default Board