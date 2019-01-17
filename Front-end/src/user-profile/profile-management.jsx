import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Add from "@material-ui/icons/Add";
import EditTwoTone from "@material-ui/icons/EditTwoTone";
import AccountCircle from "@material-ui/icons/AccountCircle";
import axios from 'axios';


import "./profile-manager.css";
import baseWindow from "../pageStruct/base-window";

class ProfileManager extends Component {
  state = {
    anchorEl: null,
    image: null,
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  constructor(props) {
    super(props);
    console.log(this.props.usuario);
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    let dataNasc = "";

    dataNasc += this.props.usuario.dataNasc[8];
    dataNasc += this.props.usuario.dataNasc[9];

    dataNasc += "/";

    dataNasc += this.props.usuario.dataNasc[5];
    dataNasc += this.props.usuario.dataNasc[6];

    dataNasc += "/";

    dataNasc += this.props.usuario.dataNasc[0];
    dataNasc += this.props.usuario.dataNasc[1];
    dataNasc += this.props.usuario.dataNasc[2];
    dataNasc += this.props.usuario.dataNasc[3];
    // action={
    //   // <IconButton>
    //   //   <MoreVertIcon />
    //   // </IconButton>
    // }
    return (
      <div className="userProfile">
      <input type="file" onChange= {this.handleFileSelect} id="img" hidden={true}/>
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
                    <Add />
                  </ListItemIcon>
                  <ListItemText inset primary="Inbox" />
                </MenuItem>
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
                </MenuItem>              </Menu>
            </Typography>
            <Typography variant="h5">
              <span>informações pessoais:</span>
            </Typography>
            <Typography variant="h5">
              <Avatar id="userAvatarCard" style={{ height: "300px" }}>
                {this.props.usuario.nome[0]}
                {this.props.usuario.sobrenome[0]}
              </Avatar>
            </Typography>
            <Typography id="information" component="p">
              <span className="cardSpan">nome:</span>
              <span className="userInfo">{this.props.usuario.nome} </span>

              <span className="userInfoS">Sobrenome:</span>
              <span className="userInfo">{this.props.usuario.sobrenome} </span>
            </Typography>

            <Typography id="information" component="p">
              <span className="cardSpan">E-mail:</span>
              <span className="userInfo">{this.props.usuario.email}</span>
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

  handleFileSelect = (event) => {
    let img = this.imageToBase64(event.target.files[0])

    console.log(event.target.files[0]);
    console.log(img);

      const fd = new FormData();
      fd.append('id', this.props.usuario.id)
      fd.append('image', img, event.target.files[0].name);
      axios.post("http://localhost:8080/library/user/manager/image-edit",fd,{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'POST',
      },
         method: "POST",
         proxy: {
           host: "localhost",
           port: "8080",
           
         }
         })
      .then( res => {
        console.log(res);
      });

  }

  changeProfileAvatar(){
      document.getElementById("img").click();
  }

   imageToBase64(img)
{
    var canvas, ctx, dataURL, base64;
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL("image/png");
    base64 = dataURL.replace(/^data:image\/png;base64,/, "");
    return base64;
}
}

export default ProfileManager;

