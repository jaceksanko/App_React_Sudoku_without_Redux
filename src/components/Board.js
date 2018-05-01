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

    toValueTile(val, idTile) {
        this.setState({
            valueTile: val,
            id: idTile
        });
    }
   

    render() {
        console.log(this.state.valueTile)
        let actBoard = this.props.actualBoard;
        let board = actBoard.map(function(el, id){
            
            if (isNaN(el)) {
                return (<label key={id}>
                    <Tile idBoard={id} inputValue={el} dis={false}/>
                    </label>
                )  
            }
            else {
            return (<label key={id}>
                <Tile idBoard={id} inputValue={el} dis={true} />
                </label>
            )
            }
        })
        return (
            <Tile valueTile={this.toValueTile}/>,
            board
        )

    }
}

export default Board