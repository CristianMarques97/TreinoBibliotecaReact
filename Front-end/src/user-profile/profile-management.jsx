import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import TextField  from "@material-ui/core/TextField";
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

import "./profile-manager.css";

class ProfileManager extends Component {
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
    editSenhaConfirm: "",
    
    editNomeError: false, 
    editSobrenomeError: false, 
    editEmailError: false, 
    editSenhaError: false, 
    editSenhaConfirmError: false,
  };

  handleDialogClose() {
    this.setState({
      openDialog: !this.state.openDialog,
    })
  }

  handleAlterCard = () => {
    this.limparCampos();
    this.setState({
      alterCard: !this.state.alterCard,
    })
  }

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
    });
  }

  render() {
    let dataNasc = "";

    dataNasc += this.props.usuario.activeUser.dataNasc[8];
    dataNasc += this.props.usuario.activeUser.dataNasc[9];

    dataNasc += "/";

    dataNasc += this.props.usuario.activeUser.dataNasc[5];
    dataNasc += this.props.usuario.activeUser.dataNasc[6];

    dataNasc += "/";

    dataNasc += this.props.usuario.activeUser.dataNasc[0];
    dataNasc += this.props.usuario.activeUser.dataNasc[1];
    dataNasc += this.props.usuario.activeUser.dataNasc[2];
    dataNasc += this.props.usuario.activeUser.dataNasc[3];
    
    return (
      <div className="userProfile">
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
          <DialogTitle id="alert-dialog-title">
          Confirmar ? 
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Deseja aplicar a nova imagem ao seu avatar ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleFileSelect()} color="primary">
              Prosseguir
            </Button>
            <Button onClick={() => this.noFileSelect()} color="primary">
              Retornar
            </Button>
          </DialogActions>
        </Dialog>

        <Card className="card" id = "infoCArd">
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
                <Avatar id="userAvatarCard" src= {"data:image/png;charset=utf-8;base64," + this.props.usuario.activeUser.profileIconDecoded} style={{ height: "300px" }}/>
             
              )}
            </Typography>
            <Typography id="information" component="p">
              <span className="cardSpan">nome:</span>
              <span className="userInfo">{this.props.usuario.activeUser.nome} </span>

              <span className="userInfoS">Sobrenome:</span>
              <span className="userInfo">{this.props.usuario.activeUser.sobrenome} </span>
            </Typography>

            <Typography id="information" component="p">
              <span className="cardSpan">E-mail:</span>
              <span className="userInfo">{this.props.usuario.activeUser.email}</span>
            </Typography>

            <Typography id="information" component="p">
              <span className="cardSpan">Data de nascimento: </span>
              <span className="userInfo">{dataNasc}</span>
            </Typography>
          </CardContent>
        </Card>
{ this.state.alterCard && (
<div>
<Card className="card" id = "editCard">
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
          <span style={{ width: "90%" }}> Alteração de Dados:: </span>
            <IconButton id="HeaderButton" onClick={() => this.handleAlterCard()}>
          <Clear />
          </IconButton>
        </Typography>
        <TextField
        className = "editTx"
        value = {this.state.editNome}
          id="outlined-name"
          label="Nome"
          margin="normal"
          variant="outlined"
          style={{height:"45px",width:"75%"}}
          error = {this.state.editNomeError}
          onChange= {event => {
            this.setState({
              editNomeError : false,
              editNome: event.target.value,
            })
          }}
        />

        <TextField
        className = "editTx"
        value = {this.state.editSobrenome}
          id="outlined-sobrenome"
          label="Sobrenome"
          margin="normal"
          variant="outlined"
          style={{height:"45px",width:"75%"}}
          error = {this.state.editSobrenomeError}
          onChange= {event => {
            this.setState({
              editSobrenomeError : false,
              editSobrenome : event.target.value,
            })
          }}
        />
        <TextField
        className = "editTx"
        value = {this.state.editEmail}
          id="outlined-email"
          label="E-mail"
          margin="normal"
          variant="outlined"
          type="email"
          style={{height:"45px",width:"75%"}}
          error = {this.state.editEmailError}
          onChange= {event => {
            this.setState({
              editEmailError : false,
              editEmail : event.target.value,
            })
          }}
        />
        <TextField
        className = "editTx"
        value = {this.state.editSenha}
          id="outlined-password"
          type="password"
          label="Senha"
          margin="normal"
          variant="outlined"
          style={{height:"45px",width:"75%"}}
          error = {this.state.editSenhaError}
          onChange= {event => {
            this.setState({
              editSenhaError : false,
              editSenha : event.target.value,
            })
          }}
        />
        <TextField
        className = "editTx"
        value = {this.state.editSenhaConfirm}
          id="outlined-passwordConfirm"
          type="password"
          label="Confirmar Senha"
          margin="normal"
          variant="outlined"
          style={{height:"45px",width:"75%"}}
          error = {this.state.editSenhaConfirmError}
          onChange= {event => {
            this.setState({
            editSenhaConfirmError :false,
            editSenhaConfirm : event.target.value,
            })
          }}
        />
        <Button size="small" style={{height:"45px",width:"50%",marginLeft:"12.5%",marginTop:"30px"}} onClick={() => this.submit()}>Alterar</Button>
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
      openDialog: false,
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
        image: null,
      })
    }).then(Response => {
      this.setState({
        anchorEl: null,
      });
        this.props.usuario.activeUser.profileIconDecoded = null;
        this.props.usuario.hasProfileIcon = false;
        this.forceUpdate();
    }) ;

  }

  handleFileSelect = event => {

    this.setState({
      anchorEl: null,
      openDialog: false,
    });
    fetch("http://localhost:8080/library/user/manager/image-edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        id: this.props.usuario.activeUser.id,
        image: this.fr.result,
      })
    }).then(response => {
      document.getElementById("img").value = null;
      this.props.usuario.activeUser.profileIconDecoded = this.fr.result.replace("data:image/png;base64,", "");
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
    editSenhaConfirm: "",
  });

  }
  checkEdit() {
// eslint-disable-next-line
    if (this.state.editNome == null || this.state.editNome == "" ) {
      this.setState({editNomeError: true,});
    }
// eslint-disable-next-line
    if (this.state.editSobrenome == null || this.state.editSobrenome == "" ) {
      this.setState({editSobrenomeError: true,});
    }
// eslint-disable-next-line
    if (this.state.editEmail == null || this.state.editEmail == "" ) {
      this.setState({editEmailError: true,});
    }
// eslint-disable-next-line
    if (this.state.editSenha == null || this.state.editSenha == "" ) {
      this.setState({editSenhaError: true,});
    }
// eslint-disable-next-line
    if (this.state.editSenhaConfirm == null || this.state.editSenhaConfirm == "") {
      this.setState({editSenhaConfirmError: true,});
    }
  
  } 

  /// precisa arrumar
  submit() {
    this.checkEdit();
    let user = this.props.activeUser;
    
    if(this.state.editNomeError || this.state.editSobrenomeError || this.state.editEmailError || this.state.editSenhaError || this.state.editSenhaConfirmError ) {
      console.log("vazei");
      return;
    }
    
      console.log("Passou aqui !");
      this.limparCampos();
    

  }
}

export default ProfileManager;
