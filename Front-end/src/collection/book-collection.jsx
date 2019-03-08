import React from "react";
import BookLibrary from "./books-library";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./book.css";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Bookcollection extends React.Component {
  state = {
    isLoaded: false,
    bookList: null
  };

  constructor(props) {
    super(props);
    console.log(this.props.userState);
    
    this.findAllBook();
  }

  

  render() {
    return (
      <div id="libContainer" style={{ display: "grid" }}>
        {this.state.isLoaded &&
          Array.from({ length: this.state.bookList.length }, (_, index) => (
            <BookLibrary
              style={{ backColor: "red" }}
              book={this.state.bookList[index]}
              userState={this.props.userState}
            />
          ))}

        {!this.state.isLoaded && (
          <CircularProgress
            style={{ marginLeft: "50%", marginTop: "25%" }}
            color="secondary"
          />
        )}
      </div>
    );
  }

  findAllBook() {
    fetch("http://localhost:8080/library/collection/book/return-all-book", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(json => {
        return json.json();
      })
      .then(json => {
        this.setState({
          bookList: json,
          isLoaded: true
        });
      });
  }
}

Bookcollection.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Bookcollection);
