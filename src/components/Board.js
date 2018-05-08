import React from 'react';
import Tile from './Tile';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueTile: '',
            id: ''  
        }; 
    }

   /*  toValueTile(ValueTile) {
        this.setState({
            valueTile: ValueTile.value,
            id: ValueTile.id
        });
    } */
   

    render() {
        let addValueTile2 = this.props.addValueTile
        let actBoard = this.props.actualBoard;
        let board = actBoard.map(function(el, id){
            
            if (isNaN(el)) {
                return (
                    <Tile idBoard={id} inputValue={el} dis={false} addValueTile={addValueTile2}/> 
                )  
            }
            else {
            return (
                <Tile idBoard={id} inputValue={el} dis={true} addValueTile={addValueTile2}/>  
            )
            }
        })
        return (
            
            board
        )

    }
}

export default Board