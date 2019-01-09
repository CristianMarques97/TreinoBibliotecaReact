import "./base-window.css";
import MyProfile from "../user-profile/my-profile";
import UnauthHome from "../apresentation/unauth-home";
import BottomNavigation from './Bottom-navigation';

import classNames from "classnames";
import React, { Component } from "react";
import { createHashHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import { Avatar, Tooltip } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import deepOrange from "@material-ui/core/colors/deepOrange";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Book from "@material-ui/icons/Book";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PageNotFound from "../not-found";

// Styles

const styles = theme => ({
  root: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "200px"
  },

  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  orangeAvatar: {
    margin: "20px",
    color: "#fff",
    marginLeft: "41.5%",
    backgroundColor: deepOrange[500]
  },

  magentaAvatar: {
    margin: "20px",
    color: "#000",
    backgroundColor: "#b0b"
  },

  avatarDiv: {
    margin: "10px",
    width: "240px"
  },

  avatarIcon: {
    margin: "20px",
    marginLeft: "80px",
    color: "#fff",
    backgroundColor: deepOrange[500]
  },

  avatarSpan: {
    margin: "75px"
  },

  button: {
    margin: theme.spacing.unit,
    marginLeft: "50px"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },

  pageContent: {

    width: "100%",
    backgroundColor: "crimsom",
    alignItems: 'end',
    height: "100%",
  },

  botttomNavigation: {
    height: "25%",
    width: "100%",
  },
});

/************************************************************************************************/

class BaseWindow extends Component {
  history = createHashHistory();
  // propiedades
  livrosAlugados = 0;
  qtdeAlert = 0;
  bemvindo = "";
  usernameAvatar = "";

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
      mobileMoreAnchorEl: null,
      drawerOpen: false,
      auth: false,
      openLoginDialog: false,
      openLoginErrorDialog: false,
      emptyForm: false,
      emptyFormPass: false,
      openLogoffDialog: false,
      usuarioAtivo: null,
    };

    if (!this.state.auth) this.history.replace("/");

    this.livrosAlugados = 0;
    this.qtdeAlert = 0;
  }

  // handlers

  handleDialogOpen = () => {
    this.setState({ openLoginDialog: !this.state.openLoginDialog });
  };

  handleLogoffDialogClose = () => {
    this.setState({ openLogoffDialog: !this.state.openLogoffDialog });
  };

  handleDialogClose = () => {
    this.setState({ openLoginDialog: false });
  };

  handleErrorDialogOpen = () => {
    this.setState({ openLoginErrorDialog: !this.state.openLoginDialog });
  };

  handleErrorDialogClose = () => {
    this.setState({ openLoginErrorDialog: false });
  };

  handleToggle = () => this.setState({ open: !this.state.drawerOpen });

  handleClose = () => this.setState({ open: false });

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  // render screen

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge
              className={classes.margin}
              badgeContent={this.livrosAlugados}
              invisible={this.livrosAlugados > 0 ? false : true}
              color="secondary"
            >
              <Book />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge
              className={classes.margin}
              badgeContent={this.qtdeAlert}
              invisible={this.qtdeAlert > 0 ? false : true}
              color="secondary"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    // render

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="title"
              color="inherit"
              noWrap
            >
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>

            <div className={classes.grow} />
            {this.state.auth && (
              <div className={classes.sectionDesktop}>
                <Tooltip TransitionComponent={Zoom} title="Meus Livros">
                  <IconButton color="inherit">
                    <Badge
                      className={classes.margin}
                      badgeContent={this.livrosAlugados}
                      invisible={this.livrosAlugados > 0 ? false : true}
                      color="secondary"
                    >
                      <Book />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Notificações">
                  <IconButton color="inherit">
                    <Badge
                      className={classes.margin}
                      badgeContent={this.qtdeAlert}
                      invisible={this.qtdeAlert > 0 ? false : true}
                      color="secondary"
                    >
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <IconButton
                  aria-owns={isMenuOpen ? "material-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            )}
            {this.state.auth && (
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-haspopup="true"
                  onClick={this.handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}

        <Dialog
          open={this.state.openLoginDialog}
          onClose={() => this.handleDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Login Com Sucesso"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.bemvindo}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Prosseguir
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openLogoffDialog}
          onClose={() => this.handleLogoffDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Log-off com sucesso"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Log-off reallizado, volte sempre
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleLogoffDialogClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openLoginErrorDialog}
          onClose={() => this.handleErrorDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Dados Incorretos</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ops: Os Dados estão incorretos, Tente novamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleErrorDialogClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        {/* Menu lateral */}
        <Drawer docked="false" width={200} open={this.state.open}>
          <MenuItem onClick={this.handleClose}>
            <ArrowBackIos /> Voltar
          </MenuItem>
          {this.state.auth && (
            <div className={classes.avatarDiv}>
              <div className="drawerUserInfo">
                <Avatar id="userAvatar" className={classes.orangeAvatar}>
                  {this.usernameAvatar}
                </Avatar>
                <span id="infoUserName">
                  {BaseWindow.usuarioLogado.nome +
                    " " +
                    BaseWindow.usuarioLogado.sobrenome}
                </span>
              </div>
              <div className="drawerOptions">
                <MenuItem onClick={() => this.navigate("/home")}>
                  User Name
                </MenuItem>
                <MenuItem>Perfil</MenuItem>
                <MenuItem>Opções</MenuItem>
              </div>
              <MenuItem onClick={() => this.logoff()}>Sair</MenuItem>
            </div>
          )}

          {!this.state.auth && (
            <div className={classes.avatarDiv}>
              <Avatar className={classes.avatarIcon}>
                <AccountCircle />
              </Avatar>

              <span className={classes.avatarSpan}>Entrar:</span>

              <br />
              <TextField
                error={this.state.emptyForm}
                id="userName"
                label="Email:"
                className={classes.textField}
                type="email"
                onChange={() => this.setState({ emptyForm: false })}
                margin="normal"
                placeholder="username@example.com"
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.login();
                  }
                }}
              />
              <br />

              <TextField
                error={this.state.emptyFormPass}
                id="userPassword"
                label="Senha:"
                className={classes.textField}
                // value={""}
                type="password"
                onChange={() => this.setState({ emptyFormPass: false })}
                margin="normal"
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.login();
                  }
                }}
              />
              <br />
              <Button
                variant="contained"
                size="medium"
                className={classes.button}
                onClick={i => this.login()}
              >
                <AccountCircle
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Entrar
              </Button>

              <br />
              <Divider className={classes.avatarDiv} />
            </div>
          )}
        </Drawer>

        {/* Conteudo abaixo do AppBar */}
        <div className= {classes.pageContent}>
        {!this.state.auth && (
          <Router basename="/#">
            <Switch>
              <Route exact path="/" component={UnauthHome} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Router>
        )}
        {this.state.auth && (
          <Router basename="/#">
            <Switch>
              <Route exact path="/" component={UnauthHome} />
              <Route path="/home" component={MyProfile} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Router>
        )}
</div>
          <Divider/>

          <BottomNavigation className ={classes.botttomNavigation}/>

      </div>
    );
  }

  // actions

  login() {
    let email = document.getElementById("userName");
    let password = document.getElementById("userPassword");
    let userFound = false;
    

    // valida campos vazios
    if (
      email.value === null ||
      email.value === "" ||
      password.value === null ||
      password.value === ""
    ) {
      if (email.value === null || email.value === "") {
        this.setState({
          emptyForm: true
        });
      }
      if (password.value === null || password.value === "") {
        this.setState({
          emptyFormPass: true
        });
      }
      return;
    }

    // busca na base de dados
    const conteudo =  fetch('http://localhost:8080/library/user/manager/login/', {
      method: 'POST',
      credentials: "include",
  headers: {
    'Content-Type': 'application/json',
  },
mode : "cors",
  body:  JSON.stringify({
    email: email.value,
    senha: password.value,
  })
})
    
    console.log(conteudo);
    





    console.log(this.state.usuarioAtivo);
    
    
    //     this.setState({
    //       auth: !this.state.auth
    //     });

    //     this.handleClose();
    //     this.usernameAvatar =
    //       BaseWindow.usuarioLogado.nome[0] +
    //       BaseWindow.usuarioLogado.sobrenome[0];
    //     console.log(this.usernameAvatar);

    //     this.bemvindo =
    //       "Bem Vindo: " +
    //       BaseWindow.usuarioLogado.nome +
    //       " " +
    //       BaseWindow.usuarioLogado.sobrenome;
    //     this.handleDialogOpen();
      
    

    // // não encontrou usuário
    // if (!userFound) {
    //   email.value = "";
    //   password.value = "";
    //   this.handleErrorDialogOpen();
    // }

    // this.history.replace("/home");
  }


  navigate(url) {
    this.history.replace(url);
  }

  logoff() {
    BaseWindow.usuarioLogado = null;
    this.setState({
      auth: !this.state.auth
    });

    this.handleLogoffDialogClose();

    this.usernameAvatar = "";

    this.history.replace("/");
  }
}

export default withStyles(styles)(BaseWindow);
