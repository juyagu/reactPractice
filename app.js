/*
JSX produce “elementos” de React
En lugar de separar artificialmente tecnologías poniendo el maquetado y la lógica en archivos separados, React separa intereses con unidades ligeramente acopladas llamadas “componentes” que contienen ambas.

*/


/*const name = 'Jose Perez';
const element = <h1>Hola, {name}</h1>
ReactDOM.render(
  element,
  document.getElementById('root')
);*/

/*function formatName(user){
  return user.nombre + ' ' + user.apellido;
}

const user = {
  nombre : 'Jose',
  apellido: 'Rodriguez'
}

const element = (
  <h1>Hola, {formatName(user)}!</h1>
);*/

/*
Después de compilarse, las expresiones JSX se convierten en llamadas a funciones JavaScript regulares y se evalúan en objetos JavaScript.

Esto significa que puedes usar JSX dentro de declaraciones if y bucles for, asignarlo a variables, aceptarlo como argumento, y retornarlo desde dentro de funciones:
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

Especificando atributos con JSX
const element = <div tabIndex="0"></div>;

También puedes usar llaves para insertar una expresión JavaScript en un atributo:
const element = <img src={user.avatarUrl}></img>;

No pongas comillas rodeando llaves cuando insertes una expresión JavaScript en un atributo. Debes utilizar comillas (para los valores de los strings) o llaves (para las expresiones), pero no ambas en el mismo atributo.

Dado que JSX es más cercano a JavaScript que a HTML, React DOM usa la convención de nomenclatura camelCase en vez de nombres de atributos HTML.
Por ejemplo, class se vuelve className en JSX, y tabindex se vuelve tabIndex.

Por defecto, React DOM escapa cualquier valor insertado en JSX antes de renderizarlo. De este modo, se asegura de que nunca se pueda insertar nada que no esté explícitamente escrito en tú aplicación. Todo es convertido en un string antes de ser renderizado. Esto ayuda a prevenir vulnerabilidades XSS (cross-site-scripting).

 ++++++++++++++++++++++++++ Renderizando elementos ++++++++++++++++++++++++
 Un elemento describe lo que quieres ver en la pantalla:
const element = <h1>Hello, world</h1>;

Los elementos de React son inmutables. Una vez creas un elemento, no puedes cambiar sus hijos o atributos. Un elemento es como un fotograma solitario en una película: este representa la interfaz de usuario en cierto punto en el tiempo.

React DOM compara el elemento y su hijos con el elemento anterior, y solo aplica las actualizaciones del DOM que son necesarias para que el DOM esté en el estado deseado.
Aunque creamos un elemento que describe el árbol de la interfaz de usuario en su totalidad en cada instante, React DOM solo actualiza el texto del nodo cuyo contenido cambió.


 +++++++++++++++++++++++ Componentes y propiedades ++++++++++++++++++++
 Los componentes permiten separar la interfaz de usuario en piezas independientes, reutilizables y pensar en cada pieza de forma aislada.
 Conceptualmente, los componentes son como las funciones de JavaScript. Aceptan entradas arbitrarias (llamadas “props”) y devuelven a React elementos que describen lo que debe aparecer en la pantalla.
La forma más sencilla de definir un componente es escribir una función de JavaScript:
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
Esta función es un componente de React válido porque acepta un solo argumento de objeto “props” (que proviene de propiedades) con datos y devuelve un elemento de React. Llamamos a dichos componentes “funcionales” porque literalmente son funciones JavaScript.

También puedes utilizar una clase de ES6 para definir un componente:
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
 Los elementos también pueden representar componentes definidos por el usuario:
 const element = <Welcome name="Sara" />;
Por ejemplo, este código muestra “Hello, Sara” en la página:

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);

Recapitulemos lo que sucede en este ejemplo:
1 - Llamamos a ReactDOM.render() con el elemento <Welcome name="Sara" />.
2 - React llama al componente Welcome con {name: 'Sara'} como “props”.
3 - Nuestro componente Welcome devuelve un elemento <h1>Hello, Sara</h1> como resultado.
4 - React DOM actualiza eficientemente el DOM para que coincida con <h1>Hello, Sara</h1>.

Nota: Comienza siempre los nombres de componentes con una letra mayúscula.

React trata los componentes que empiezan con letras minúsculas como etiquetas del DOM. Por ejemplo, <div /> representa una etiqueta div HTML pero <Welcome /> representa un componente y requiere que Welcome esté definido.


Composición de componentes
Los componentes pueden referirse a otros componentes en su salida. Esto nos permite utilizar la misma abstracción de componente para cualquier nivel de detalle. Un botón, un cuadro de diálogo, un formulario, una pantalla: en aplicaciones de React, todos son expresados comúnmente como componentes.

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


Extracción de componentes
Dividir los componentes en otros más pequeños.
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
Acepta author (un objeto), text (un string), y date (una fecha) como props, y describe un comentario en una web de redes sociales.
1 - Primero, vamos a extraer Avatar:
  function Avatar(props) {
    return (
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />

    );
  }
  El Avatar no necesita saber que está siendo renderizado dentro de un Comment. Esto es por lo que le dimos a su propiedad un nombre más genérico: user en vez de author.
  Ahora podemos simplificar Comment un poquito:
    function Comment(props) {
    return (
      <div className="Comment">
        <div className="UserInfo">
          <Avatar user={props.author} />
          <div className="UserInfo-name">
            {props.author.name}
          </div>
        </div>
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }

2 - A continuacion, vamos a extraer un componente UserInfo que renderiza un Avatar al lado del nombre del usuario:
    function UserInfo(props) {
    return (
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>
    );
  }
  Esto nos permite simplificar Comment aun más:
    function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }
  
  Ya sea que declares un componente como una función o como una clase, este nunca debe modificar sus props.
  function sum(a, b) {
    return a + b;
  }
  Tales funciones son llamadas “puras” por que no tratan de cambiar sus entradas, y siempre devuelven el mismo resultado para las mismas entradas.
  En contraste, esta función es impura por que cambia su propia entrada:
  function withdraw(account, amount) {
   account.total -= amount;
  }
  
  Todos los componentes de React deben actuar como funciones puras con respecto a sus props.
*/

/*function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);*/
/*
  Sin embargo, se pierde un requisito crucial: el hecho de que Clock configure un temporizador y actualice la interfaz de usuario cada segundo debe ser un detalle de implementación de Clock.
  Idealmente, queremos escribir esto una vez y que Clock se actualice a sí mismo:

  ReactDOM.render(
    <Clock />,
   document.getElementById('root')
  );

  Para implementar esto, necesitamos agregar «estado» al componente Clock.
  El estado es similar a las props, pero es privado y está completamente controlado por el componente.
  
Convertir una función en una clase
Se puede convertir un componente de función como Clock en una clase en cinco pasos:
1 - Crear una clase ES6 con el mismo nombre que herede de React.Component.
2 - Agregar un único método vacío llamado render().
3 - Mover el cuerpo de la función al método render().
4 - Reemplazar props con this.props en el cuerpo de render().
5 - Borrar el resto de la declaración de la función ya vacía.

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
Clock ahora se define como una clase en lugar de una función.

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);

El método render se invocará cada vez que ocurre una actualización; pero, siempre y cuando rendericemos <Clock /> en el mismo nodo del DOM, se usará solo una única instancia de la clase Clock. Esto nos permite utilizar características adicionales como el estado local y los métodos de ciclo de vida.


 +++ Agregar estado local a una clase +++
1 -Reemplazar this.props.date con this.state.date en el método render():
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

2 -Añadir un constructor de clase que asigne el this.state inicial: 
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
Los componentes de clase siempre deben invocar al constructor base con props.

3 -Eliminar la prop date del elemento <Clock />:
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

El resultado es el siguiente: 
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);


+++ Agregar métodos de ciclo de vida a una clase +++
Podemos declarar métodos especiales en la clase del componente para ejecutar algún código cuando un componente se monta y desmonta:
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

Estos métodos son llamados «métodos de ciclo de vida».
El método componentDidMount() se ejecuta después que la salida del componente ha sido renderizada en el DOM.
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

 Eliminaremos el temporizador en el método de ciclo de vida componentWillUnmount():
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);


Repasemos rápidamente lo que está sucediendo y el orden en que se invocan los métodos:
1- Cuando se pasa <Clock /> a ReactDOM.render(), React invoca al constructor del componente Clock. Ya que Clock necesita mostrar la hora actual, inicializa this.state con un objeto que incluye la hora actual. Luego actualizaremos este estado.
2- React invoca entonces al método render() del componente Clock. Así es como React sabe lo que se debe mostrar en pantalla. React entonces actualiza el DOM para que coincida con la salida del renderizado de Clock.
3- Cuando la salida de Clock se inserta en el DOM, React invoca al método de ciclo de vida componentDidMount(). Dentro de él, el componente Clock le pide al navegador que configure un temporizador para invocar al método tick() del componente una vez por segundo
4- Cada segundo el navegador invoca al método tick(). Dentro de él, el componente Clock planifica una actualización de la interfaz de usuario al invocar a setState() con un objeto que contiene la hora actual. Gracias a la invocación a setState(), React sabe que el estado cambió e invoca de nuevo al método render() para saber qué debe estar en la pantalla. Esta vez, this.state.date en el método render() será diferente, por lo que el resultado del renderizado incluirá la hora actualizada. Conforme a eso React actualiza el DOM.
5- Si el componente Clock se elimina en algún momento del DOM, React invoca al método de ciclo de vida componentWillUnmount(), por lo que el temporizador se detiene.

+++ Usar el estado correctamente +++
1- No modifiques el estado directamente
Por ejemplo, esto no volverá a renderizar un componente:
// Incorrecto
this.state.comment = 'Hello';

En su lugar utiliza setState():
// Correcto
this.setState({comment: 'Hello'});

El único lugar donde puedes asignar this.state es el constructor.

2- Las actualizaciones del estado pueden ser asíncronas
React puede agrupar varias invocaciones a setState() en una sola actualización para mejorar el rendimiento.
Debido a que this.props y this.state pueden actualizarse de forma asincrónica, no debes confiar en sus valores para calcular el siguiente estado.
Por ejemplo, este código puede fallar en actualizar el contador:
// Incorrecto
this.setState({
  counter: this.state.counter + this.props.increment,
});

Para arreglarlo, usa una segunda forma de setState() que acepta una función en lugar de un objeto. Esa función recibirá el estado previo como primer argumento, y las props en el momento en que se aplica la actualización como segundo argumento:
// Correcto
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

3- Las actualizaciones de estado se fusionan:
Cuando invocas a setState(), React combina el objeto que proporcionaste con el estado actual.
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
Luego puedes actualizarlas independientemente con invocaciones separadas a setState():
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
La fusión es superficial, asi que this.setState({comments}) deja intacto a this.state.posts, pero reemplaza completamente this.state.comments.

4- Los datos fluyen hacia abajo:
Ni los componentes padres o hijos pueden saber si un determinado componente tiene o no tiene estado y no les debería importar si se define como una función o una clase.
Por eso es que el estado a menudo se le denomina local o encapsulado. No es accesible desde otro componente excepto de aquel que lo posee y lo asigna.
Un componente puede elegir pasar su estado como props a sus componentes hijos:
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
Esto también funciona para componentes definidos por el usuario:
<FormattedDate date={this.state.date} />
El componente FormattedDate recibiría date en sus props y no sabría si vino del estado de Clock, de los props de Clock, o si se escribió manualmente:
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

A esto comúnmente se le llama flujo de datos «descendente» o «unidireccional». Cualquier estado siempre es propiedad de algún componente específico, y cualquier dato o interfaz de usuario derivados de ese estado solo pueden afectar los componentes «debajo» de ellos en el árbol


 ***** Manejando eventos *****
Los eventos de React se nombran usando camelCase, en vez de minúsculas.
Con JSX pasas una función como el manejador del evento, en vez de un string.

HTML:
<button onclick="activateLasers()">
  Activate Lasers
</button>

REACT:
<button onClick={activateLasers}>
  Activate Lasers
</button>

Otra diferencia es que en React no puedes retornar false para prevenir el comportamiento por defecto. Debes, explícitamente, llamar preventDefault. 

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
Cuando defines un componente usando una clase de ES6, un patrón muy común es que los manejadores de eventos sean un método de la clase.
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Este enlace es necesario para hacer que `this` funcione en el callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);

 +++ Pasando argumentos a escuchadores de eventos +++
Dentro de un bucle es muy común querer pasar un parámetro extra a un manejador de eventos.
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>




*/

