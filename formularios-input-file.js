/*
En React, un <input type="file" /> siempre es un componente no controlado porque su valor solo puede ser establecido por un usuario, y no mediante programación.
*/

class FileInput extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(
            `File elegida - ${
                this.fileInput.current.files[0].name
            }`
        );
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="">
                    Upload File:
                    <input type="file" ref={this.fileInput}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
  );