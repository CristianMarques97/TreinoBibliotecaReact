import React from 'react';
import BookLibrary from "./books-library";
import Button from "@material-ui/core/Button";

class Bookcollection extends React.Component {

    state = {
        bookList: null,
    }

    constructor(props) {
        super(props);
        this.findAllBook();
        // this.renderBook();
    }

    render() { 
        return ( <div><Button onClick = {() => console.log(this.state.bookList)} >Show</Button></div> );
    }


    renderBook() {
        return (<BookLibrary userState = {this.props.userState} book = {this.book}/>);
    }

    findAllBook() {
        fetch("http://localhost:8080/library/collection/book/return-all-book", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            mode: "cors",
          })
            .then(json => {
              return json.json();
            })
            .then(json => {
                this.setState({
                    bookList: json,
                });
            });
    }
}
 
export default Bookcollection;