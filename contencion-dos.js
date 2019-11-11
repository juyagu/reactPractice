/**
 * Aunque es menos común, a veces puedes necesitar múltiples “agujeros” en un componente. En estos casos puedes inventarte tu propia convención en lugar de usar children
 */

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    )
}

function Contactos(props){
    return(
        <h1>Contactos</h1>
    )
}

function Chat(props){
    return(
        <h1>Chat</h1>
    )
}
function App() {
    return (
        <SplitPane
            left={
                <Contactos />
            }
            right={
                <Chat />
            }
        />
    );
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
  );