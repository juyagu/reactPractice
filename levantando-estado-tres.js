function BolilingVerdict(props){
    if(props.celsius >= 100){
        return <p>El agua va a hervir</p>
    }
    return <p>El agua no va a hervir</p>
}

function toCelsius(fahrenheit){
    return (fahrenheit - 32) * 5 / 9; 
}

function toFahrenheit(celsius){
    return (celsius * 9 /5) + 32;
}

function tryConvert(temperatura, convert){
    const input = parseFloat(temperatura);
    if(Number.isNaN(input)){
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) /1000;
    return rounded.toString();
}

class TemperatureInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperatura: ''};
    }

    handleChange(e){
        //this.setState({temperatura: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }
    /**
     * En React, la compartición del estado puede lograrse moviendo el estado hacia arriba al ancestro común más    cercano de los componentes que lo necesitan. A esto se le llama “levantar el estado”.
     */

    render(){
        //Sabemos que las propiedades son de solo lectura.
        const temperatura = this.props.temperatura;
        const scale = this.props.scale;
        return(
            <fieldset>
                <legend>Ingrese la temperatura en {scaleNames[scale]}</legend>
                <input value={temperatura} onChange={this.handleChange} />
            </fieldset>
        );
    }
}
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperatura: '', scale: 'c'};
    }

    handleCelsiusChange(temperatura){
        this.setState({scale: 'c', temperatura});
    }

    handleFahrenheitChange(temperatura){
        this.setState({scale: 'f', temperatura});
    }

    render(){
        const scale = this.state.scale;
        const temperatura = this.state.temperatura;
        const celsius = scale === 'f' ? tryConvert(temperatura,toCelsius) : temperatura;
        const fahrenheit = scale === 'c' ? tryConvert(temperatura,toFahrenheit) : temperatura;
        return(
            <div>
                <TemperatureInput
                    scale='c'
                    temperatura={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale='f'
                    temperatura={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BolilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        )
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
  );

  /**
   * Recapitulemos qué pasa cuando editamos una entrada:

React llama a la función especificada como onChange en el <input> del DOM. En nuestro caso es el método handleChange en el componente TemperatureInput.
El método handleChange en el componente TemperatureInput llama a this.props.onTemperatureChange() con el nuevo valor. Sus propiedades, incluyendo onTemperatureChange, fueron provistas para el componente padre Calculator.
Cuando renderizó previamente, Calculator especificó que onTemperatureChange del componente TemperatureInput con la escala Celsius es el método handleCelsiusChange y onTemperatureChange del componente TemperatureUnit con escala Fahrenheit es el método handleFahrenheitChange. Entonces, cada uno de estos métodos es llamado dependiendo del componente que se edite.
Dentro de estos métodos, el componente Calculator pregunta a React para volver a renderizar a sí mismo llamando al método this.setState() con el nuevo valor y la escala actual de la entrada que acabamos de editar.
React llama al método render del componente Calculator para saber cómo debe lucir la interfaz de usuario. Los valores de ambas entradas son recalculados en base a la temperatura actual y la escala activa. La conversión de temperatura es hecha aquí.
React llama a los métodos render de los componentes TemperatureInput de manera individual con sus nuevas propiedades especificadas por Calculator. Aprende como sus interfaces de usuario deberían verse.
React llama al método render del componente BoilingVerdict, pasando la temperatura en Celsius como una propiedad.
React DOM actualiza el DOM con el componente BoilingVerdict y sincroniza los valores deseados para las entradas. La entrada que acabamos de actualizar recibe su valor actual, y la otra entrada es actualizada a su temperatura luego de hacer la conversión.
   */
  