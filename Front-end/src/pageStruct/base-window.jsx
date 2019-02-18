import "./base-window.css";
import MyProfile from "../user-profile/my-profile";
import UnauthHome from "../apresentation/unauth-home";
import BottomNavigation from "./Bottom-navigation";
import PageNotFound from "../not-found";

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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { fade } from "@material-ui/core/styles/colorManipulator";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import Add from "@material-ui/icons/Add";
import Book from "@material-ui/icons/Book";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import PropTypes from "prop-types";
import Livros from "../model/books";


let suggestions = [];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

// Styles

const styles = theme => ({
  root: {
    width: "100%"
  },
  margin: {
    margin: theme.spacing.unit
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
    alignItems: "end"
  },

  botttomNavigation: {
    height: "25%",
    width: "100%"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

/************************************************************************************************/

class BaseWindow extends Component {
  repoUpdate() {
    fetch("http://localhost:8080/library/collection/book/book-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        nome: this.state.popper
      })
    })
      .then(json => {
        return json.json();
      })
      .then(response => {
        suggestions = [];
        let element = response;
        console.log(element);
        for (let i = 0; i < element.length; i++) {
          suggestions.push(element[i].nome);
        }
      });
  }
  history = createHashHistory();
  // propiedades
  livrosAlugados = 0;
  qtdeAlert = 0;
  bemvindo = "";
  usernameAvatar = "";
  userName = "";
  constructor(props) {
    super(props);

    this.state = {
      hasProfileIcon: false,
      // login form
      email: "",
      password: "",
      emptyForm: false,
      emptyFormPass: false,
      showPassword: false,
      activeUser: null,
      errorMessage: "",

      //create Account form
      newEmail: "",
      newNome: "",
      newSobrenome: "",
      newDataNasc: "",
      newSenha: "",
      newSenhaConfirm: "",

      emptyCreateFormEmail: false,
      emptyCreateFormNome: false,
      emptyCreateFormSobrenome: false,
      emptyCreateFormDataNasc: false,
      emptyCreateFormSenha: false,
      emptyCreateFormSenhaConfirm: false,

      //
      anchorEl: null,
      mobileMoreAnchorEl: null,
      // drawer control
      open: false,
      drawerOpen: false,
      auth: false,
      // dialog control
      openLoginDialog: false,
      openLoginErrorDialog: false,
      openLogoffDialog: false,
      createDialogOpen: false,
      single: "",
      popper: "",
      suggestions: []
    };

    this.repoUpdate();

    if (!this.state.auth) this.history.replace("/");

    this.livrosAlugados = 0;
    this.qtdeAlert = 0;
  }

  // handlers

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState(
      {
        [name]: newValue
      },
    );
  };

  handleCreateDialogOpen = () => {
    this.setState({ createDialogOpen: !this.state.createDialogOpen });
  };

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

  navigateHome() {
    this.history.replace("/home");
    this.handleMenuClose();
  }

  // render screen

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => this.navigateHome()}>Profile</MenuItem>
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
              Biblioteca - Controle de empréstimos e dados cadastrais
            </Typography>
            <SearchIcon style={{marginLeft: "15px", marginRight: "-15px"}} />

            <div className={classes.search}>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  classes,
                  placeholder: "Buscar Livro",
                  value: this.state.popper,
                  onChange: this.handleChange("popper"),
                  onKeyPress: (event) => this.searchBook(event),
                  inputRef: node => {
                    this.popperNode = node;
                  },
                  InputLabelProps: {
                    shrink: true
                  }
                }}
                theme={{
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
                }}
                renderSuggestionsContainer={options => (
                  <Popper
                    anchorEl={this.popperNode}
                    open={Boolean(options.children)}
                  >
                    <Paper
                      square
                      {...options.containerProps}
                      style={{
                        width: this.popperNode
                          ? this.popperNode.clientWidth
                          : null
                      }}
                    >
                      {options.children}
                    </Paper>
                  </Popper>
                )}
              />
           
            </div>
            <Button onClick= {() => this.bookSearchNav()} color="inherit">Procurar</Button>
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
          <DialogTitle id="alert-dialog-title">
            Erro Ao Tentar Realizar log-in
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleErrorDialogClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.createDialogOpen}
          onClose={() => this.limparCampos()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cadastrar-se</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insira o seus dados para criar o cadastro
            </DialogContentText>
            <TextField
              error={this.state.emptyCreateFormEmail}
              autoFocus
              value={this.state.newEmail}
              margin="dense"
              id="crateEmail"
              label="Email Address"
              type="email"
              placeholder="username@example.com"
              onChange={event => {
                this.setState({
                  emptyCreateFormEmail: false,
                  newEmail: event.target.value
                });
              }}
            />

            <br />
            <TextField
              error={this.state.emptyCreateFormNome}
              value={this.state.newNome}
              margin="dense"
              id="createNome"
              label="Nome"
              type="text"
              placeholder="Diddy"
              onChange={event => {
                this.setState({
                  emptyCreateFormNome: false,
                  newNome: event.target.value
                });
              }}
            />
            <br />
            <TextField
              error={this.state.emptyCreateFormSobrenome}
              value={this.state.newSobrenome}
              margin="dense"
              id="createSobrenome"
              label="Sobrenome"
              type="text"
              placeholder="Kong"
              onChange={event => {
                this.setState({
                  emptyCreateFormSobrenome: false,
                  newSobrenome: event.target.value
                });
              }}
            />
            <br />
            <TextField
              error={this.state.emptyCreateFormDataNasc}
              value={this.state.newDataNasc}
              margin="dense"
              InputLabelProps={{ shrink: true }}
              id="createDataNasc"
              label="Data de Nascimento"
              type="date"
              onChange={event => {
                this.setState({
                  emptyCreateFormDataNasc: false,
                  newDataNasc: event.target.value
                });
              }}
            />
            <br />
            <TextField
              error={this.state.emptyCreateFormSenha}
              value={this.state.newSenha}
              margin="dense"
              id="createSenha"
              label="Senha"
              type="password"
              onChange={event => {
                this.setState({
                  emptyCreateFormSenha: false,
                  newSenha: event.target.value
                });
              }}
            />
            <br />
            <TextField
              error={this.state.emptyCreateFormSenhaConfirm}
              value={this.state.newSenhaConfirm}
              margin="dense"
              id="createSenhaConfirm"
              label="Confirmar Senha"
              type="password"
              onChange={event => {
                this.setState({
                  emptyCreateFormSenhaConfirm: false,
                  newSenhaConfirm: event.target.value
                });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.limparCampos()} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => this.cadastrar()} color="primary">
              Cadastrar
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
                {!this.state.hasProfileIcon && (
                  <Avatar id="userAvatar" className={classes.orangeAvatar}>
                    {this.usernameAvatar}
                  </Avatar>
                )}

                {this.state.hasProfileIcon && (
                  <Avatar
                    id="userAvatar"
                    src={
                      "data:image/png;base64," +
                      this.state.activeUser.profileIconDecoded
                    }
                    className={classes.orangeAvatar}
                  />
                )}

                <span id="infoUserName">{this.userName}</span>
              </div>
              <Divider />
              <div className="drawerOptions">
                <MenuItem onClick={() => this.history.replace("/home")}>
                  Perfil
                </MenuItem>
                <MenuItem>Acervo</MenuItem>
                <MenuItem>Suporte</MenuItem>
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
                value={this.state.email}
                className={classes.textField}
                type="email"
                onChange={event => {
                  this.setState({
                    emptyForm: false,
                    email: event.target.value
                  });
                }}
                margin="normal"
                placeholder="username@example.com"
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.login();
                  }
                }}
              />
              <br />
              <FormControl
              className={classNames(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="passConfirm">Senha:</InputLabel>
              <Input
                error={this.state.emptyFormPass}
                id="userPassword"
                label="Senha:"
                className={classes.textField}
                value={this.state.password}
                type={this.state.showPassword ? "text" : "password"}
                onChange={event => {
                  this.setState({
                    emptyFormPass: false,
                    password: event.target.value
                  });
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
                margin="normal"
                onKeyPress={event => {
                  if (event.key === "Enter") {
                    this.login();
                  }
                }}
              />
            </FormControl>
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

              <Button
                id="btnCadastrar"
                variant="contained"
                size="medium"
                onClick={this.handleCreateDialogOpen}
              >
                <Add
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Cadastrar-se
              </Button>
            </div>
          )}
        </Drawer>

        {/* Conteudo abaixo do AppBar */}
        <div className={classes.pageContent}>
          {!this.state.auth && (
            <Router basename="/#">
              <Switch>
                <Route exact path="/" component={UnauthHome} />
                <Route
                  path="/book/:auth/:name"
                  component = {Livros}
                />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Router>
          )}
          {this.state.auth && (
            <Router basename="/#">
              <Switch>
                <Route exact path="/" component={UnauthHome} />
                 {/* Passa a informação para o filho(Forma alternativa ao redux) */}
                <Route
                  path="/home"
                  render={() => <MyProfile parentState={this.state} />}
                />
                    <Route
                  path="/book/:auth/:name"
                  component = {Livros}
                />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Router>
          )}
        </div>

        <footer style={{ marginTop: "80px" }}>
          <Divider />
          <BottomNavigation className={classes.botttomNavigation} />
        </footer>
      </div>
    );
  }

  // actions

  login() {
    // valida campos vazios
    if (
      this.state.email === null ||
      this.state.email === "" ||
      this.state.password === null ||
      this.state.password === ""
    ) {
      if (this.state.email === null || this.state.email === "") {
        this.setState({
          emptyForm: true
        });
      }
      if (this.state.password === null || this.state.password === "") {
        this.setState({
          emptyFormPass: true
        });
      }
      return;
    }

    // busca na base de dados
    let conteudo = null;

    fetch("http://localhost:8080/library/user/manager/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.password
      })
    })
      .then(Response => {
        return Response.json();
      })
      .then(jsonResponse => {
        conteudo = jsonResponse;

        this.setState({
          auth: !this.state.auth,
          activeUser: conteudo,
          email: "",
          password: ""
        });

        if (conteudo.profileIconDecoded != null) {
          this.setState({
            hasProfileIcon: true
          });
        } else {
          this.setState({
            hasProfileIcon: false
          });
        }
        this.handleClose();
        this.setActiveUser();
      })
      .catch(error => {
        console.log(error);

        let errorMsg = "";
        // eslint-disable-next-line
        if (error == "TypeError: Failed to fetch")
          // eslint-disable-next-line
          errorMsg = "Erro No servidor tente novamente mais tarde";
        // eslint-disable-next-line
        else if (error == "TypeError: Cannot read property '0' of undefined") {
          errorMsg = "e-mail ou senha inválidos";
        }
        // eslint-disable-next-line
        else if (error == "SyntaxError: Unexpected end of JSON input") {
          errorMsg = "e-mail ou senha inválidos";
        } else {
          errorMsg = "houve um erro inesperado";
        }

        this.setState({
          email: "",
          password: "",
          errorMessage: errorMsg,
          auth: false,
          activeUser: conteudo
        });

        this.handleErrorDialogOpen();
      });
  }

  setActiveUser() {
    this.usernameAvatar =
      this.state.activeUser.nome[0] + this.state.activeUser.sobrenome[0];

    console.log(this.usernameAvatar);
    console.log(this.state.activeUser);

    this.bemvindo =
      "Bem Vindo: " +
      this.state.activeUser.nome +
      " " +
      this.state.activeUser.sobrenome;
    this.userName =
      this.state.activeUser.nome + " " + this.state.activeUser.sobrenome;

    this.handleDialogOpen();
    this.history.replace("/home");
  }

  logoff() {
    this.setState({
      auth: !this.state.auth,
      activeUser: null,
    });

    this.handleLogoffDialogClose();

    this.usernameAvatar = "";

    this.history.replace("/");
  }

  limparCampos() {
    this.setState({
      newEmail: "",
      newNome: "",
      newSobrenome: "",
      newDataNasc: "",
      newSenha: "",
      newSenhaConfirm: ""
    });
    this.handleCreateDialogOpen();
  }
  cadastrar() {
    let validate = false;
    // valida os campos
    if (this.state.newEmail === null || this.state.newEmail === "") {
      this.setState({
        emptyCreateFormEmail: true
      });
      validate = true;
    }
    if (this.state.newNome === null || this.state.newNome === "") {
      this.setState({
        emptyCreateFormNome: true
      });
      validate = true;
    }

    if (this.state.newSobrenome === null || this.state.newSobrenome === "") {
      this.setState({
        emptyCreateFormSobrenome: true
      });
      validate = true;
    }

    if (this.state.newDataNasc === null || this.state.newDataNasc === "") {
      this.setState({
        emptyCreateFormDataNasc: true
      });
      validate = true;
    }

    if (this.state.newSenha === null || this.state.newSenha === "") {
      this.setState({
        emptyCreateFormSenha: true
      });
      validate = true;
    }

    if (
      this.state.newSenhaConfirm === null ||
      this.state.newSenhaConfirm === ""
    ) {
      this.setState({
        emptyCreateFormSenhaConfirm: true
      });
      validate = true;
    }

    // eslint-disable-next-line
    if (this.state.newSenha != this.state.newSenhaConfirm) {
      this.setState({
        emptyCreateFormSenha: true,
        emptyCreateFormSenhaConfirm: true
      });
      validate = true;
    }

    if (validate) {
      return;
    } else {
      if (
        this.state.emptyCreateFormSenha &&
        this.state.emptyCreateFormSenhaConfirm
      ) {
        this.setState({
          emptyCreateFormSenha: false,
          emptyCreateFormSenhaConfirm: false
        });
      }

      let conteudo = null;

      fetch("http://localhost:8080/library/user/manager/new/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify({
          nome: this.state.newNome,
          sobrenome: this.state.newSobrenome,
          dataNasc: this.state.newDataNasc,
          email: this.state.newEmail,
          senha: this.state.newSenha
        })
      })
        .then(Response => {
          return Response.json();
        })
        .then(jsonResponse => {
          conteudo = jsonResponse;

          this.setState({
            auth: !this.state.auth,
            activeUser: conteudo,
            hasProfileIcon: false
          });
          this.handleCreateDialogOpen();
          this.limparCampos();
          this.setActiveUser();
        })
        .catch(error => {
          let errorMsg = "";
          // eslint-disable-next-line
          if (error == "TypeError: Failed to fetch")
            errorMsg = "Erro No servidor tente novamente mais tarde";
          // eslint-disable-next-line
          else if (error == "SyntaxError: Unexpected end of JSON input") {
            errorMsg = "e-mail ou senha inválidos";
          }
          this.setState({
            email: "",
            password: "",
            errorMessage: errorMsg,
            activeUser: null,
            auth: !this.state.auth
          });

          this.handleErrorDialogOpen();
        });
      this.handleCreateDialogOpen();

      return;
    }
  }

  searchBook(event){ 
    if (event.key === "Enter") {
     this.bookSearchNav();
    }
  }

  bookSearchNav() {
    // eslint-disable-next-line
    if(this.state.popper == "")
    return;
    let auth = "";
    if(this.state.activeUser != null) auth = this.state.activeUser.id;
    else auth = "no-user";
    this.forceUpdate();
    this.history.replace({
      pathname: "/book/" + auth + "/" + this.state.popper,
      state: this.state,
    });
  }

}

BaseWindow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BaseWindow);
