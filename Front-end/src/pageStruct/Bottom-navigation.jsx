import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class BottomNavigation extends Component {
  SnackMessage = "";
  constructor(props,state) {
    super(props);
    this.state = state;
    this.state = {
      userEmail: "",
      emptyForm: false,
      open: false,
      openSnack: false
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

  handleClick = () => {
    this.setState({ openSnack: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnack: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className = "foot">
      <Typography style = {{width: "30%",float: "left",  marginTop: "40px", marginLeft: "150px",fontSize: "16px"}}>Inscreva-se em nossa newsletter: </Typography>
          <TextField style = {{marginLeft: "-420px"}}
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
            style= {{marginTop: "25px",marginLeft: "10px"}}
            onClick={() => this.subscribe()}
          >
            Entrar
          </Button>
          <Snackbar
          style={{
            height: "25px" 
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSnack}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.SnackMessage}</span>}
          action={[
            <Button
              key="undo"
              color="secondary"
              size="small"
              onClick={this.handleClose}
            >
              Fechar
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
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
     this.SnackMessage = "usuário \"" + this.state.userEmail + "\" cadastrado com sucesso em nossa newsletter";
      this.handleClick();
      this.setState({
        userEmail: ""
      });

     
    }
  }
}


export default withStyles(styles)(BottomNavigation);
