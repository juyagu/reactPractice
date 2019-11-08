/*
    En React, puedes crear distintos componentes que encapsulan el comportamiento que necesitas. Entonces, puedes renderizar solamente algunos de ellos, dependiendo del estado de tu aplicación.
*/

function UserGreeting() {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
    return <h1>Please sign up.</h1>;
} 

//Vamos a crear un componente Greeting que muestra cualquiera de estos componentes dependiendo si el usuario ha iniciado sesión:

function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting />;
    }else{
        return <GuestGreeting />
    }
}

/*ReactDOM.render(
    <Greeting isLoggedIn={true} />,
    document.getElementById('root')
)*/

//Variables de elementos
//Puedes usar variables para almacenar elementos. Esto puede ayudarte para renderizar condicionalmente una parte del componente mientras el resto del resultado no cambia.

//Considera estos dos componentes nuevos que representan botones de cierre e inicio de sesión:
function LoginButton(props){
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    )
}

function LogoutButton(props){
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

// Crearemos un componente con estado llamado LoginControl.
//El componente va a renderizar <LoginButton /> o <LogoutButton /> dependiendo de su estado actual
class LoginControl extends React.Component {
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false}
    }

    handleLoginClick(){
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick(){
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        }else{
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}

/*ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
)*/

//If en una línea con operador lógico &&
function Mailbox(props){
    const unreadMessages = props.unreadMessages;

    return (
        <div>
            <h1>Hola!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    Usted tiene {unreadMessages.length} sin leer
                </h2>
            }
            
        </div>
    );
}

//const messages = ['React','Re: React','Re:Re: React'];
const messages = [];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);

//Esto funciona porque en JavaScript, true && expresión siempre evalúa a expresión, y false && expresión siempre evalúa a false.
//Por eso, si la condición es true, el elemento justo después de && aparecerá en el resultado. Si es false, React lo ignorará.


//If-Else en una línea con operador condicional
//Otro método para el renderizado condicional de elementos en una línea es usar el operador condicional condición ? true : false de JavaScript.
/*
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}

También puede usarse para expresiones más grandes, aunque es menos obvio lo que está pasando:

render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton  onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
*/