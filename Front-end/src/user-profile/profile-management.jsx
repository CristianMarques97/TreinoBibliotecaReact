import React, { Component } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./profile-manager.css";
import baseWindow from "../pageStruct/base-window";

class ProfileManager extends Component {
  state = { expanded: false };

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

    return (
      <div className="userProfile">
        <Card className="card">
          <CardContent>
            <Typography
              className="title"
              color="textPrimary"
              gutterBottom
              component="h2"
            >
              Dados Cadastrais
              <IconButton  style={{textAlign: "right"}}>
                <MoreVertIcon/>
              </IconButton>
            </Typography>
            <Typography variant="h5">
              <span>informações pessoais:</span>
            </Typography>
            <Typography variant="h5">

            <Avatar id= "userAvatarCard" style={{height: "300px"}}>
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
          <CardActions />
        </Card>
      </div>
    );
  }
}

export default ProfileManager;
