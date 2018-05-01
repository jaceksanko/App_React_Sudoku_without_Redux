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
        this.props.valueTile(event.target.value, event.target.id);
        /* this.setState({
            value: event.target.value,
            id: event.target.id
        }); */
    }

    render() {
        
        return (
            <input id={this.props.idBoard} type="number" min="1" max="9" value={this.state.value} onChange={this.handleChange} disabled={this.props.dis}/>
        )
    }
}

export default Tile;