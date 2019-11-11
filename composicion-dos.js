/**
 * 
 * @param {*} props
 * La composición funciona igual de bien para componentes definidos como clases: 
 */
function FancyBorder(props){
    return(
        <div className={'FancyBorder FancyBorder-'+ props.color}>
            {props.children}
        </div>
    )
}
function Dialog(props){
    return(
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    )
}

class SignUpDialog extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''}
    }

    render(){
        return(
            <Dialog 
                title="Programa de exploración de Marte"
                message="Como nos debemos dirigir a usted?">
                    <input value={this.state.login} 
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSignUp}>Ingresar</button>
                </Dialog>
            
        )
    }

    handleChange(e){
        this.setState({login: e.target.value});
    }

    handleSignUp(e){
        alert(`Bienvenido a bordo, ${this.state.login}`);
    }
}

ReactDOM.render(
    <SignUpDialog />,
    document.getElementById('root')
  );