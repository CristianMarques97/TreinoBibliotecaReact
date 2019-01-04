import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import Snackbar from "@material-ui/core/Snackbar";
// import { SnackbarProvider, withSnackbar } from "notistack";


import "./base-window";

const styles = theme => ({
  snackbar: {
    position: "absolute"
  },
  snackbarContent: {
    width: 360
  }
});

class BottomNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      emptyForm: false,
      open: false
    };

    this.onChange = e => {
      this.setState({
        emptyForm: false
      });
      console.log(e.target.value);
      this.setState({
        userEmail: e.target.value
      });
    };
  }

  handleOpen = message => variant => () => {
    // this.setState({
    //   open: false,
    // })

    this.props.enqueueSnackbar({message}, { variant });

  };

  render() {
    const { classes } = this.props;
    return (
      <footer>
        {/* <SnackbarProvider maxSnack={2}> */}
          <TextField
            error={this.state.emptyForm}
            id="userEmail"
            label="Email:"
            type="email"
            margin="normal"
            value={this.state.userEmail}
            onChange={this.onChange}
            placeholder="username@example.com"
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.subscribe();
              }
            }}
          />

          <Button
            variant="contained"
            size="medium"
            className="btnLogin"
            onClick={() => this.subscribe()}
          >
            Entrar
          </Button>
          <br />

          {/* <Snackbar
            open={this.state.open}
            autoHideDuration={4000}
            onClose={this.handleClose}
            ContentProps={{
              "aria-describedby": "snackbar-fab-message-id",
              className: classes.snackbarContent
            }}
            message={<span id="snackbar-fab-message-id">Archived</span>}
            action={
              <Button color="inherit" size="small" onClick={this.handleClose}>
                ok
              </Button>
            }
            className={classes.snackbar}
          /> 
          </SnackbarProvider> */}
      </footer>
    );
  }

  subscribe() {
    var response;
    var type;
    if (this.state.userEmail === "" || this.emptyForm === null) {
      this.setState({
        emptyForm: true
      });

      response = "Favor preencher o seu email";
      type = "error";

      this.handleOpen(response, type);



    } else {
      console.log(
        "Usuário: " + this.state.userEmail + " cadastrado na newsletter"
      );
      this.setState({
        userEmail: ""
      });

     
    }
  }
}

export default withStyles(styles)(BottomNavigation);
