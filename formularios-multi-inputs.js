/*
Cuando necesitas manejar múltiples elementos input controlados, puedes agregar un atributo name a cada uno de los elementos y dejar que la función controladora decida que hacer basada en el valor de event.target.name.

Ten en cuenta como utilizamos la sintaxis de la propiedad name computada de ES6 para actualizar la clave del estado correspondiente al nombre del input.

this.setState({
  [name]: value
})
*/
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <label>
                    Is Going:
                    <input
                        type="checkbox"
                        name="isGoing"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <label>
                    Number of guests:
                <input
                        type="number"
                        name="numberOfGuests"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        )
    }
}

ReactDOM.render(
    <Reservation />,
    document.getElementById('root')
);