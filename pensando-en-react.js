/**
 * Pero cómo sabes qué debería ser su propio componente? Usa las mismas técnicas para decidir si deberías crear una función u objeto nuevo. Una técnica es el principio de responsabilidad única, esto significa que un componente debe, idealmente, hacer solo una cosa. Si termina creciendo entonces debería ser dividido en componentes más pequeños.
 * Separa tu interfaz de usuario en componentes de forma tal que cada componente se corresponda con una parte de tu modelo de datos.
 * Verás que tenemos cinco componentes en nuestra aplicación de ejemplo
 * FilterableProductTable (naranja): contiene la totalidad del ejemplo
 * SearchBar (azul): recibe lo que escriba el usuario
 * ProductTable (verde): muestra y filtra la colección de datos con base en lo que escriba el usuario
 * ProductCategoryRow (turquesa): muestra el encabezado de cada categoría
 * ProductRow (rojo): muestra una fila por cada producto
 */

 /*
 Ahora que tenemos nuestra jerarquía de componentes, es momento de implementar la aplicación. La forma más fácil es construir una versión que tome nuestro modelo de datos y muestre la interfaz de usuario sin interactividad. 
 Para construir una versión estática de tu aplicación que muestre tu modelo de datos vas a necesitar construir componentes que reusen otros componentes y pasen datos usando props. props son una forma de pasar datos de un padre a su hijo. Si estás familiarizado con el concepto de estado, no uses para nada el estado para crear esta versión estática. El estado está reservado para interactividad, esto es, cuando los datos cambian a través del tiempo. Dado que esta es una versión estática de la aplicación, no lo necesitas.
 Puedes construir tu aplicación de arriba para abajo o de abajo para arriba. Esto es, puedes o empezar construyendo los componentes más arriba en la jerarquía (empezar por FilterableProductTable) o puedes empezar por los que están más abajo (ProductRow).
 */
/**
 * Vayamos uno por uno y pensemos cuales son parte del estado. Hazte estas tres preguntas por cada pieza de información:

¿Viene del padre como props? Entonces probablemente no sea estado.
¿Se queda sin cambios con el tiempo? Entonces, probablemente no sea estado.
¿Puedes calcularlo con base a otro estado o prop en tu componente? Entonces, no es parte del estado.
La lista original de productos llega como props, entonces no es estado. El texto de búsqueda y el valor del checkbox parecen ser estado ya que cambian con el tiempo y no se pueden calcular usando otra información. Finalmente, la lista filtrada de productos no es estado debido a que puede ser calculada combinando la lista original de productos con el texto de búsqueda y el valor del checkbox.
Finalmente, nuestro estado es:

El texto de búsqueda que el usuario ingresó
El valor del checkbox
 */

class ProductCategoryRow extends React.Component {
    render() {
      const category = this.props.category;
      return (
        <tr>
          <th colSpan="2">
            {category}
          </th>
        </tr>
      );
    }
  }
  
  class ProductRow extends React.Component {
    render() {
      const product = this.props.product;
      const name = product.stocked ?
        product.name :
        <span style={{color: 'red'}}>
          {product.name}
        </span>;
  
      return (
        <tr>
          <td>{name}</td>
          <td>{product.price}</td>
        </tr>
      );
    }
  }
  
  class ProductTable extends React.Component {
  
    render() {
      const rows = [];
      let lastCategory = null;
      
      this.props.products.forEach((product) => {
        if (product.category !== lastCategory) {
          rows.push(
            <ProductCategoryRow
              category={product.category}
              key={product.category} />
          );
        }
        rows.push(
          <ProductRow
            product={product}
            key={product.name} />
        );
        lastCategory = product.category;
      });
  
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
  }
  
  class SearchBar extends React.Component {
    render() {
      return (
        <form>
          <input type="text" placeholder="Search..." />
          <p>
            <input type="checkbox" />
            {' '}
            Only show products in stock
          </p>
        </form>
      );
    }
  }
  
  class FilterableProductTable extends React.Component {
    render() {
      return (
        <div>
          <SearchBar />
          <ProductTable products={this.props.products} />
        </div>
      );
    }
  }






const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];

  ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
  );
