import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.inputValue,
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <input type="number" min="1" max="9" value={this.state.value} onChange={this.handleChange} disabled={this.props.dis}/>
        )
    }
}

export default Tile;