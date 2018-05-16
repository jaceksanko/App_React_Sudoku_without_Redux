import React from 'react';
import EventEmitterMixin, {eventEmitter} from 'react-event-emitter-mixin';

class Tile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.inputValue,
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        /* this.eventEmitter = this.eventEmitter.bind(this); */
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

    componentWillMount(){
        eventEmitter('on','eventB',()=>{
            this.setState({
                value: this.props.inputValue,
                id: ''
            })
        });
        
    }

   /*  static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.inputValue !== prevState.inputValue) {
            null
          };
       
        return {
            value: nextProps.inputValue
        }
        
    } */

    render() {
        
        return (
            <label key={this.props.idBoard} >
                <input style={this.props.style} id={this.props.idBoard} type="number" min="1" max="9" value={this.state.value} onChange={this.handleChange} disabled={this.props.dis}/>
            </label>
        )
    }
}

export default Tile;