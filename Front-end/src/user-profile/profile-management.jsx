import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Delete from "@material-ui/icons/Delete";
import Clear from "@material-ui/icons/Clear";
import EditTwoTone from "@material-ui/icons/EditTwoTone";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

import "./profile-manager.css";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class ProfileManager extends Component {
  snackbarMessage = "";

  state = {
    anchorEl: null,
    image: null,
    imageToUpload: null,
    openDialog: false,
    alterCard: false,

    editNome: "",
    editSobrenome: "",
    editEmail: "",
    editSenha: "",
    editSenhaNew: "",
    editSenhaConfirm: "",

    editNomeError: false,
    editSobrenomeError: false,
    editEmailError: false,
    editSenhaError: false,
    editSenhaNewError: false,
    editSenhaConfirmError: false,

    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  handleDialogClose() {
    this.setState({
      openDialog: !this.state.openDialog
    });
  }

  handleAlterCard = () => {
    this.limparCampos();
    this.setState({
      alterCard: !this.state.alterCard
    });
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  constructor(props) {
    super(props);

    // console.log(this.props.usuario.activeUser.profileIconDecoded);
    console.log(this.props.usuario.activeUser);
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenEditCard = () => {
    this.limparCampos();
    this.setState({
      anchorEl: null,
      alterCard: !this.state.alterCard,
      editNome: this.props.usuario.activeUser.nome,
      editSobrenome: this.props.usuario.activeUser.sobrenome,
      editEmail: this.props.usuario.activeUser.email
    });
  };

  dateConversor = (dateString) => {
    var p = dateString.split(/\D/g)
    return [p[2],p[1],p[0] ].join("-")
    }

  render() {
    let dataNasc = "";
    dataNasc = this.dateConversor(this.props.usuario.activeUser.dataNasc);

    const { classes } = this.props;

    return (
      <div className="userProfile" id="usrProfile">
        <Snackbar
          style={{
            height: "25px" /* backgroundColor: "rgba(50, 204, 19, 0.89)" */
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.snackbarMessage}</span>}
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

        <input
          type="file"
          onChange={() => this.handleAvatarChange()}
          id="img"
          hidden={true}
          accept=".png,.PNG"
        />

        <Dialog
          open={this.state.openDialog}
          onClose={() => this.handleDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmar ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja aplicar a nova imagem ao seu avatar ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.noFileSelect()} color="primary">
              Retornar
            </Button>
            <Button onClick={() => this.handleFileSelect()} color="primary">
              Prosseguir
            </Button>
          </DialogActions>
        </Dialog>

        <Card className="card" id="infoCArd">
          <CardContent>
            <Typography id="cardTitle" variant="h1">
              <span style={{ width: "60%" }}>Dados Cadastrais: </span>
              <IconButton id="HeaderButton" onClick={this.handleMenuClick}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="actionMenu"
                anchorEl={this.state.anchorEl}
                open={this.state.anchorEl}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={() => this.handleOpenEditCard()}>
                  <ListItemIcon>
                    <EditTwoTone />
                  </ListItemIcon>
                  <ListItemText inset primary="Editar Informações" />
                </MenuItem>
                <MenuItem onClick={() => this.changeProfileAvatar()}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText inset primary="Alterar Avatar" />
                </MenuItem>
                <MenuItem onClick={() => this.removeAvatar()}>
                  <ListItemIcon>
                    <Delete />
                  </ListItemIcon>
                  <ListItemText inset primary="Remover Avatar" />
                </MenuItem>
              </Menu>
            </Typography>
            <Typography variant="h5">
              <span>informações pessoais:</span>
            </Typography>
            <Typography variant="h5">
              {this.props.usuario.activeUser.profileIconDecoded == null && (
                <Avatar id="userAvatarCard" style={{ height: "300px" }}>
                  {this.props.usuario.activeUser.nome[0]}
                  {this.props.usuario.activeUser.sobrenome[0]}
                </Avatar>
              )}

              {this.props.usuario.activeUser.profileIconDecoded != null && (
                <Avatar
                  id="userAvatarCard"
                  src={
                    "data:image/png;charset=utf-8;base64," +
                    this.props.usuario.activeUser.profileIconDecoded
                  }
                  style={{ height: "300px" }}
                />
              )}
            </Typography>
            <Typography id="information" component="p">
              <span className="cardSpan">nome:</span>
              <span className="userInfo">
                {this.props.usuario.activeUser.nome}{" "}
              </span>

              <span className="userInfoS">Sobrenome:</span>
              <span className="userInfo">
                {this.props.usuario.activeUser.sobrenome}{" "}
              </span>
            </Typography>

            <Typography id="information" component="p">
              <span className="cardSpan">E-mail:</span>
              <span className="userInfo">
                {this.props.usuario.activeUser.email}
              </span>
            </Typography>

            <Typography id="information" component="p">
              <span className="cardSpan">Data de nascimento: </span>
              <span className="userInfo">{dataNasc}</span>
            </Typography>

            {this.props.usuario.activeUser.adm && (
              <Typography id="information" component="p">
                <span className="cardSpan" style={{ fontSize: "20px" }}>
                  Nível De acesso especial:{" "}
                </span>
                <span className="userInfo" style={{ fontSize: "20px" }}>
                  Administrador
                </span>
              </Typography>
            )}
          </CardContent>
        </Card>
        {this.state.alterCard && (
          <div>
            <Card className="card" id="editCard">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  <span style={{ width: "90%" }}> Alteração de Dados:: </span>
                  <IconButton
                    id="HeaderButton"
                    onClick={() => this.handleAlterCard()}
                  >
                    <Clear />
                  </IconButton>
                </Typography>
                <TextField
                  className="editTx"
                  value={this.state.editNome}
                  id="outlined-name"
                  label="Nome"
                  margin="normal"
                  variant="outlined"
                  style={{ height: "45px", width: "75%" }}
                  error={this.state.editNomeError}
                  onChange={event => {
                    this.setState({
                      editNomeError: false,
                      editNome: event.target.value
                    });
                  }}
                />

                <TextField
                  className="editTx"
                  value={this.state.editSobrenome}
                  id="outlined-sobrenome"
                  label="Sobrenome"
                  margin="normal"
                  variant="outlined"
                  style={{ height: "45px", width: "75%" }}
                  error={this.state.editSobrenomeError}
                  onChange={event => {
                    this.setState({
                      editSobrenomeError: false,
                      editSobrenome: event.target.value
                    });
                  }}
                />
                <TextField
                  className="editTx"
                  value={this.state.editEmail}
                  id="outlined-email"
                  label="E-mail"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  style={{ height: "45px", width: "75%" }}
                  error={this.state.editEmailError}
                  onChange={event => {
                    this.setState({
                      editEmailError: false,
                      editEmail: event.target.value
                    });
                  }}
                />

                <Button
                  size="small"
                  style={{
                    height: "45px",
                    width: "50%",
                    marginLeft: "12.5%",
                    marginTop: "30px"
                  }}
                  onClick={() => this.submit()}
                >
                  Alterar
                </Button>

                <Divider style={{ marginTop: "15px" }} />

                <Typography color="textSecondary" gutterBottom>
                  <span style={{ width: "90%" }}> Alteração de Dados: </span>
                </Typography>

                <TextField
                  className="editTx"
                  value={this.state.editSenha}
                  id="outlined-password"
                  type="password"
                  label="Senha"
                  margin="normal"
                  variant="outlined"
                  style={{ height: "45px", width: "75%" }}
                  error={this.state.editSenhaError}
                  onChange={event => {
                    this.setState({
                      editSenhaError: false,
                      editSenha: event.target.value
                    });
                  }}
                />

                <TextField
                  className="editTx"
                  value={this.state.editNewSenha}
                  id="outlined-password-new"
                  type="password"
                  label="Nova Senha"
                  margin="normal"
                  variant="outlined"
                  style={{ height: "45px", width: "75%" }}
                  error={this.state.editSenhaNewError}
                  onChange={event => {
                    this.setState({
                      editSenhaNewError: false,
                      editSenhaNew: event.target.value
                    });
                  }}
                />

                <TextField
                  className="editTx"
                  value={this.state.editSenhaConfirm}
                  id="outlined-passwordConfirm"
                  type="password"
                  label="Confirmar Senha"
                  margin="normal"
                  variant="outlined"
                  style={{ height: "45px", width: "75%" }}
                  error={this.state.editSenhaConfirmError}
                  onChange={event => {
                    this.setState({
                      editSenhaConfirmError: false,
                      editSenhaConfirm: event.target.value
                    });
                  }}
                />

                <Button
                  size="small"
                  style={{
                    height: "45px",
                    width: "50%",
                    marginLeft: "12.5%",
                    marginTop: "30px"
                  }}
                  onClick={() => this.submitSenha()}
                >
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
  fr = new FileReader();
  handleAvatarChange() {
    let img = document.getElementById("img").files[0];

    this.fr = new FileReader();
    this.fr.readAsDataURL(img);
    this.handleDialogClose();
  }

  noFileSelect() {
    this.setState({
      anchorEl: null,
      openDialog: false
    });

    document.getElementById("img").value = null;
  }

  removeAvatar() {
    fetch("http://localhost:8080/library/user/manager/image-edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        id: this.props.usuario.activeUser.id,
        image: null
      })
    }).then(Response => {
      this.setState({
        anchorEl: null
      });
      this.props.usuario.activeUser.profileIconDecoded = null;
      this.props.usuario.hasProfileIcon = false;
      this.forceUpdate();
    });
  }

  handleFileSelect = event => {
    this.setState({
      anchorEl: null,
      openDialog: false
    });
    fetch("http://localhost:8080/library/user/manager/image-edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        id: this.props.usuario.activeUser.id,
        image: this.fr.result
      })
    }).then(response => {
      document.getElementById("img").value = null;
      this.props.usuario.activeUser.profileIconDecoded = this.fr.result.replace(
        "data:image/png;base64,",
        ""
      );
      // console.log(this.props.usuario.activeUser);
      this.props.usuario.hasProfileIcon = true;
      this.forceUpdate();
    });
  };

  changeProfileAvatar() {
    document.getElementById("img").click();
  }

  limparCampos() {
    this.setState({
      editNome: "",
      editSobrenome: "",
      editEmail: "",
      editSenha: "",
      editSenhaConfirm: ""
    });
  }

  submit() {
    let editNull = false;
    // eslint-disable-next-line
    if (this.state.editNome == null || this.state.editNome == "") {
      this.setState({ editNomeError: true });
      editNull = true;
    }
    // eslint-disable-next-line
    if (this.state.editSobrenome == null || this.state.editSobrenome == "") {
      this.setState({ editSobrenomeError: true });
      editNull = true;
    }
    // eslint-disable-next-line
    if (this.state.editEmail == null || this.state.editEmail == "") {
      this.setState({ editEmailError: true });
      editNull = true;
    }
    if (    // eslint-disable-next-line
      this.state.editNome == this.props.usuario.activeUser.nome &&
      // eslint-disable-next-line
      this.state.editSobrenome == this.props.usuario.activeUser.sobrenome &&
      // eslint-disable-next-line
      this.state.editEmail == this.props.usuario.activeUser.email
    ) {
      this.snackbarMessage = "Nenhum dado foi alterado";
      this.handleClick();
      return;
    }

    if (editNull) {
      return;
    }
    this.snackbarMessage = "Houve um erro inesperado";
    fetch("http://localhost:8080/library/user/manager/edit-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        id: this.props.usuario.activeUser.id,
        nome: this.state.editNome,
        sobrenome: this.state.editSobrenome,
        email: this.state.editEmail
      })
    }).then(response => {
      this.snackbarMessage = "Alteração com sucesso";

      this.props.usuario.activeUser.nome = this.state.editNome;
      this.props.usuario.activeUser.sobrenome = this.state.editSobrenome;
      this.props.usuario.activeUser.email = this.state.editEmail;

      this.handleAlterCard();
      this.handleClick();
      this.limparCampos();
    });
    // console.log(this.props.usuario.activeUser);
  }

  submitSenha() {
    let auth = true;
    // eslint-disable-next-line
    if (this.state.editSenhaNew == null || this.state.editSenhaNew == "") {
      this.setState({ editSenhaNewError: true });
      auth = false;
    }
    // eslint-disable-next-line
    if (this.state.editSenha == null || this.state.editSenha == "") {
      this.setState({ editSenhaError: true });
      auth = false;
    }
    // eslint-disable-next-line
    if (
      this.state.editSenhaConfirm == null ||
      // eslint-disable-next-line
      this.state.editSenhaConfirm == ""
    ) {
      this.setState({ editSenhaConfirmError: true });
      auth = false;
    }

    if (!auth) {
      return;
    }
    // eslint-disable-next-line
    if (this.state.editSenha != this.props.usuario.activeUser.senha) {
      this.snackbarMessage = "Senha atual incorreta";
      this.setState({
        editSenha: ""
      });
      this.handleClick();
      return;
    }
    // eslint-disable-next-line
    if (this.state.editSenhaNew != this.state.editSenhaConfirm) {
      this.snackbarMessage = "O campo de confirmação da nova senha é diferente";
      this.setState({
        editSenha: ""
      });
      this.handleClick();
      return;
    }
    // eslint-disable-next-line
    if (this.state.editSenhaNew == this.props.usuario.activeUser.senha) {
      this.snackbarMessage = "Nova senha é igual a senha atual";
      this.setState({
        editSenha: ""
      });
      this.handleClick();
      return;
    }

    this.snackbarMessage = "Houve um erro inesperado";
    fetch("http://localhost:8080/library/user/manager/password-change", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        id: this.props.usuario.activeUser.id,
        senha: this.state.editSenhaNew
      })
    }).then(response => {
      this.snackbarMessage = "Alteração com sucesso";

      this.props.usuario.activeUser.senha = this.state.editSenhaNew;

      this.handleAlterCard();
      this.handleClick();
      this.limparCampos();
    });
  }
}

ProfileManager.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileManager);
