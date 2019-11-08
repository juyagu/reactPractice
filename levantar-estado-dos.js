/*
Nuestro nuevo requisito es que, además de la temperatura en Celsius, proveemos la temperatura en Fahrenheit, y estas se mantienen sincronizadas.
*/

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
function BolilingVerdict(props){
    if(props.celsius >= 100){
        return <p>El agua va a hervir</p>
    }
    return <p>El agua no va a hervir</p>
}

class TemperatureInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.state = {temperatura: ''};
    }

    handleChange(event){
        this.setState({temperatura: event.target.value});
    }

    render(){
        const temperatura = this.state.temperatura;
        const scale = this.props.scale;
        return(
            <fieldset>
                <legend>Ingrese la temperatura {scaleNames[scale]}:</legend>
                <input 
                    value={temperatura}
                    onChange={this.handleChange}
                />
            </fieldset>
        )
    }
}

class Calculator extends React.Component {
    render(){
        return(
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        )
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
  );