import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.inputValue,
            id: ''
        };

        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange(event) {
        event.preventDefault();
        this.setState({
            value: event.target.value,
            id: event.target.id
        })

        const valueTile = {
            value: event.target.value,
            id: event.target.id
        };
        this.props.addValueTile(valueTile)
        
    }

   /*  handleSubmit(event) {
        const ValueTile = {
            value: this.state.value,
            id: this.state.id
        };
        console.log(this.props.valueTile);
        this.props.valueTile(ValueTile);
      }; */

    render() {
        
        return (
            <label key={this.props.idBoard} >
                <input id={this.props.idBoard} type="number" min="1" max="9" value={this.state.value} onChange={this.handleChange} disabled={this.props.dis}/>
            </label>
        )
    }
}

export default Tile;