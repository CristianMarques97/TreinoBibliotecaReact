import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Add from "@material-ui/icons/Add";
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
    openDialog: false
  };

  handleDialogClose() {
    this.setState({
      openDialog: !this.state.openDialog,
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

        <Card className="card">
          <CardContent>
            <Typography id="cardTitle" variant="h1">
              <span style={{ width: "90%" }}>Dados Cadastrais: </span>
              <IconButton id="HeaderButton" onClick={this.handleMenuClick}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                id="actionMenu"
                anchorEl={this.state.anchorEl}
                open={this.state.anchorEl}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleMenuClose}>
                  <ListItemIcon>
                    <EditTwoTone />
                  </ListItemIcon>
                  <ListItemText inset primary="Editar Informações" />
                </MenuItem>
                <MenuItem onClick={() => this.changeProfileAvatar()}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText inset primary="Editar Avatar" />
                </MenuItem>
                <MenuItem onClick={() => this.removeAvatar()}>
                  <ListItemIcon>
                    <Add />
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

}

export default ProfileManager;
