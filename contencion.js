/**
 * Algunos componentes no conocen sus hijos de antemano. Esto es especialmente común para componentes como Sidebar o Dialog que representan “cajas” genéricas.
 * Recomendamos que estos componentes usen la prop especial children para pasar elementos hijos directamente en su resultado.
 */

 function FancyBorder(props){
     return(
         <div className={'FancyBorder FancyBorder-'+ props.color}>
             {props.children}
         </div>
     )
 }
 //Esto permite que otros componentes les pasen hijos arbitrarios anidando el JSX:
function WelcomeDialog(){
    return(
        <FancyBorder color="blue">
            <h1>Welcome</h1>
            <p className="Dialog-message">
                Gracias por visitar nuestro espacio.
            </p>
        </FancyBorder>
    )
}


ReactDOM.render(
    <WelcomeDialog />,
    document.getElementById('root')
  );