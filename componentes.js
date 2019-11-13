/*
Un componente de React se puede crear de varias formas. Una de ellas es con el método createClass que ofrece la librería.
const React = require('react')

const MyComponent = React.createClass({
    ...
})

Y la otra es utilizando las clases que ofrece ECMAScript 6 (ES2015). En este caso heredan de la clase Component de React y necesitan llamar al constructor padre en el método constructor Si usamos Webpack con Babel podemos también usar el sistema de módulos de ES2015:
import React form 'react'

class MyComponent extends React.Component {
  constructor () {
    super()
  }
  ...
}

RENDER
Todo componente de React, tiene un método Render que es el que se encarga de renderizar en el navegador el HTML correspondiente al componente.
En este método es donde usamos JSX para facilitar el desarrollo y creación de elementos HTML. 
*/


class MiComponente extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <span>Hola!, soy un componente!</span>
            </div>
        )
    }
}

ReactDOM.render(
    <MiComponente />,
    document.getElementById('root')
  );

/*
PROPIEDADES
Un componente en React puede recibir propiedades como parámetros desde un componente padre para poder insertar valores y eventos en su HTML.
*/

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let menuOptions = ['Opción 1','Opción 2','Opción 3'];
        return <Menu options={menuOptions} />
    }
}


class Menu extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let options = this.props.options;
        return(
            <ul>
                {options.map(option => <li>{option}</li>)}
            </ul>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

