/*
Usualmente, muchos componentes necesitan reflejar el mismo cambio en los datos. Recomendamos elevar el estado compartido al ancestro común más cercano.
*/
function BolilingVerdict(props){
    if(props.celsius >= 100){
        return <p>El agua va a hervir</p>
    }
    return <p>El agua no va a hervir</p>
}

class Calculator extends React.Component{
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
        return(
            <fieldset>
                <legend>Ingrese la temperatura en Celsius:</legend>
                <input 
                    value={temperatura}
                    onChange={this.handleChange}
                />

                <BolilingVerdict  
                    celsius={parseFloat(temperatura)}
                />
            </fieldset>
        )
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
  );