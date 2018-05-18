import React from 'react';
import Tile from './Tile';

class Board extends React.Component { 

    render() {
        let addValueTile = this.props.addValueTile
        let actBoard = this.props.actualBoard;
        let resetTile = this.props.resetTile;
        let afterRestartTile = this.props.afterRestartTile
        let style = {color: 'red'}
        let board = actBoard.map(function(el, id){
            
            if (isNaN(el)) {
                return (
                    <Tile key={id} idBoard={id} inputValue={el} dis={false} addValueTile={addValueTile} resetTile={resetTile} /> 
                )  
            }
            else {
                return (
                    <Tile key={id} style={style} idBoard={id} inputValue={el} dis={true} addValueTile={addValueTile}/>  
                )
            }
        })
        return (
            
            board
        )

    }
}

export default Board