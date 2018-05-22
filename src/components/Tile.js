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
        if (event.target.value > 0 && event.target.value <= 9 && isNaN(event.target.value) === false ) {
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
        else {
            this.setState({
                value: '',
                id: ''   
            })
        }
       
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.inputValue !== this.props.inputValue ) {           
            this.setState({
                value: nextProps.inputValue,
                id: ''
            })
        };


        if (nextProps.resetTile === true) {
            this.setState({
                value: '',
                id: ''   
            })
        };

        
    }

    render() {
        
        return (
            <label key={this.props.idBoard} >
                <input className={this.props.style} id={this.props.idBoard} type="number" min="1" max="9" value={this.state.value} onChange={this.handleChange} disabled={this.props.dis}/>
            </label>
        )
    }
}

export default Tile;