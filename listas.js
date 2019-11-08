//Dado el código de abajo, usamos la función map() para tomar un array de numbers y duplicar sus valores. Asignamos el nuevo array devuelto por map() a la variable doubled y la mostramos:
/*const numbers = [1,2,3,4,5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);*/

//Puedes hacer colecciones de elementos e incluirlos en JSX usando llaves {}.
/*const listItems = numbers.map((number) =>
    <li>{number}</li>
);*/

/*ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
);*/

//Usualmente renderizarías listas dentro de un componente.
//Podemos refactorizar el ejemplo anterior en un componente que acepte un array de numbers e imprima una lista de elementos.
/*function NumberList(props){
    const numbers = props.numbers;
    const listItems = numbers.map(number => 
        <li>{number}</li>
    );
    
    return (
        <ul>{listItems}</ul>
    );
}
const numbers = [1,2,3,4,5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);*/

//Vamos a asignar una key a nuestra lista de ítems dentro de numbers.map() y arreglar el problema de la falta de key.
function NumberList(props){
    const numbers = props.numbers;
    const listItems = numbers.map(number => 
        <li key={number.toString()}>
            {number}
        </li>
    );
    
    return (
        <ul>{listItems}</ul>
    );
}
const numbers = [1,2,3,4,5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
