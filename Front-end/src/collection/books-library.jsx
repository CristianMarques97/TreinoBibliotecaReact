import React from "react";

import { Avatar } from "@material-ui/core";
import Book from "@material-ui/icons/Book";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { createHashHistory } from "history";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import "./book.css";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  }
});

class BookLibrary extends React.Component {
  state = {
    auth: true,
    passError: false,
    pass: "",
    loginDialog: false,
    errorDialog: false,
    alertDialog: false,
    livro: null,
    onUpdate: false,
    showPassword: false,
    error: false
  };

  errorMessage = "";

  history = createHashHistory();
  constructor(props) {
    super(props);
    this.nome = "";
  }
  componentDidMount() {
    this.returnBook(this.props.book);
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleLoginDialog() {
    this.setState({
      loginDialog: !this.state.loginDialog
    });
  }

  handleErrorDialog() {
    this.setState({
      errorDialog: !this.state.errorDialog
    });
  }

  handleAlertDialog() {
    this.setState({
      alertDialog: !this.state.alertDialog
    });
  }

  nome = "";
  render() {
    const { classes } = this.props;

    return (
      <div>
        {!this.state.onUpdate && (
          <Typography
            style={{
              textAlign: "center",
              marginTop: "20vh",
              fontSize: "30px",
              fontWeight: "bold"
            }}
          >
            {this.nome}{" "}
          </Typography>
        )}
        {this.state.onUpdate && (
          <Dialog
            open={this.state.alertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={() => this.handleAlertDialog()}
          >
            <DialogTitle id="alert-dialog-title">
              Livro alugado com sucesso !
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                O livro "{this.state.livro.nome}" foi alugado com sucesso
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleAlertDialog()} color="primary">
                Continuar
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <Dialog
          open={this.state.errorDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onClose={() => this.handleErrorDialog()}
        >
          <DialogTitle id="alert-dialog-title">
            Erro ao alugar o livro
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.rentError}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleErrorDialog()} color="primary">
              Continuar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.loginDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Realmente é você ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Por Favor Confirme sua senha:
            </DialogContentText>
            <FormControl
              className={classNames(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="passConfirm">Senha</InputLabel>
              <Input
                // style = {{marginTop: "10px",flexBasis: 200, }}
                type={this.state.showPassword ? "text" : "password"}
                error={this.state.passError}
                value={this.state.pass}
                margin="dense"
                id="passConfirm"
                label="Senha"
                autoFocus
                onChange={event => {
                  this.setState({
                    passError: false,
                    error: false,
                    pass: event.target.value
                  });
                }}
                onKeyPress={event => {
                  if (event.key === "Enter") this.authUser();
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {this.state.error && (
                <p style={{ color: "#f00" }}>{this.errorMessage}</p>
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleLoginDialog()} color="primary">
              Voltar
            </Button>
            <Button onClick={() => this.authUser()} color="primary">
              Continuar
            </Button>
          </DialogActions>
        </Dialog>

        {this.state.onUpdate && (
          <div id="book-info-avatar" style={{ height: "100px" }}>
            <Avatar id="avatarIcon">
              <Book id="book-icon" />
            </Avatar>
            <Typography id="book-info-name" style={{ fontSize: "25px" }}>
              {this.state.livro.nome}
            </Typography>
          </div>
        )}
         {this.state.onUpdate && (
          <div id="book-info" style={{ height: "100px" }}>
            <Typography id="book-info-label"> Código do Livro:</Typography>
            <Typography id="book-info-name">{this.state.livro.id}</Typography>

            <Typography id="book-info-label">Editora: </Typography>
            <Typography id="book-info-name">
              {this.state.livro.editora}
            </Typography>

            <Typography id="book-info-label">Ano de lançamento: </Typography>
            <Typography id="book-info-name">
              {this.dateConversor(this.state.livro.ano)}
            </Typography>

            <Typography id="book-info-label">
              Quantidade de páginas:{" "}
            </Typography>
            <Typography id="book-info-name">{this.state.livro.numero_paginas}</Typography>
          </div>
        )}

        {this.state.onUpdate && 
          <div id="alugar">
            <Button id="btnAlugar" onClick={() => this.handleLoginDialog()} disabled = {this.state.livro.qtde < 1}>{this.state.livro.qtde > 0 ? "Alugar" : "Esgotado"}</Button>
          </div>
        }
      </div>
    );
  }

  dateConversor = dateString => {
    var p = dateString.split(/\D/g);
    return [p[2], p[1], p[0]].join("-");
  };

  authUser() {
    fetch("http://localhost:8080/library/collection/user/autenticate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        id: this.props.userState.id,
        senha: this.state.pass
      })
    })
      .then(json => {
        // eslint-disable-next-line
        if (json.status == 404) {
          json.json().then(response => {
            this.errorMessage = response.message;
          });
          throw json;
        }
        return json.json();
      })
      .then(response => {
        this.rentBook();
        this.setState({
          pass: ""
        });
      })
      .catch(json => {
        this.setState({
          error: true,
          passError: true
        });
      });
  }

  returnBook(book) {
    this.setState({
      livro: this.props.book,
      onUpdate: true
    });
  }

  rentError;

  rentBook() {
    this.handleLoginDialog();
    fetch("http://localhost:8080/library/collection/user/rent-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        id_cliente: this.props.userState.id,
        id_livro: this.state.livro.id
      })
    })
      .then(json => {
        // eslint-disable-next-line
        if (json.status == 409) {
          json.json().then(response => {
            this.rentError = response.message;
          });
          throw json;
        }

        let livro =  this.state.livro;
        livro.qtde--;

        this.setState({
          livro: livro,
        });
        let btn = document.getElementById("btnAlugar");
        btn.textContent = "Esgotado";
        btn.disabled = true
        this.handleAlertDialog();
      })
      .catch(json => {
        this.handleErrorDialog();
      });
  }
}

BookLibrary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookLibrary);
