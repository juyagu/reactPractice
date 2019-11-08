/*
 En un componente controlado, los datos del formulario son manejados por un componente React. La alternativa son los componentes no controlados, donde los datos del formulario son manejados por el propio DOM.

 Del mismo modo, <input type="checkbox"> e <input type="radio"> admiten defaultChecked, y <select> y <textarea> admiten defaultValue.
 */

 class NameForm extends React.Component {
     constructor(props){
         super(props);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.input = React.createRef();
     }

     handleSubmit(event){
         console.log(`Un nombre fue enviado: ${this.input.current.value}`);
         event.preventDefault();
     }

     render(){
         return(
             <form onSubmit={this.handleSubmit}>
                 <label>
                     Name:
                     <input
                        defaultValue="Bob"
                         type="text" 
                         ref={this.input}/>
                 </label>
                 <input type="submit" value="Submit"/>
             </form>
         )
     }
 }

 ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
  );