import React from "react";
import classNames from "classnames";
import * as URLs from "../constants/url-constants";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import "./access-style.css";
import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

function createData(id, nome, sobrenome, email, datanasc, access) {
  return { id: id, nome, sobrenome, email, datanasc, access };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: "Id", numeric: true, disablePadding: true, label: "Id" },
  { id: "nome", numeric: false, disablePadding: false, label: "Nome" },
  {
    id: "sobrenome",
    numeric: false,
    disablePadding: false,
    label: "Sobrenome"
  },
  { id: "email", numeric: false, disablePadding: false, label: "E-mail" },
  {
    id: "datanasc",
    numeric: false,
    disablePadding: false,
    label: "Data De Nascimento"
  },
  {
    id: "access",
    numeric: false,
    disablePadding: false,
    label: "Acesso Especial"
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Ordenar"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "dark"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      id="table-toolbar"
      style={{ height: "6px" }}
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Clientes
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {/* {numSelected > 0 ? ( */}

        {numSelected > 0 && (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={event => {
                AccessAdm.removerUsuario();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {/* ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )} */}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    height: "45%",
    overflowX: "auto"
  }
});

class AccessAdm extends React.Component {
  snackbarMessage = "";
  state = {
    order: "asc",
    orderBy: "nome",
    selected: [],
    authOk: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    openDialog: false
  };

  dateConversor = dateString => {
    var p = dateString.split(/\D/g);
    return [p[2], p[1], p[0]].join("-");
  };

  constructor(props) {
    super(props);
    this.populateTable();
  }

  handleSnackClick = () => {
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

  populateTable() {
    this.setState({
      data: []
    });
    fetch(URLs.LibraryURL + "management/manager/manage-access", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    }).then(response => {
      response.json().then(res => {
        res.forEach(element => {
          // eslint-disable-next-line
          if (element.id != this.props.usuario.activeUser.id) {
            let auth = "";
            if (element.adm) {
              auth = "Sim";
            } else {
              auth = "Não";
            }
            this.state.data.push(
              createData(
                element.id,
                element.nome,
                element.sobrenome,
                element.email,
                this.dateConversor(element.dataNasc),
                auth
              )
            );
          }
        });
        this.forceUpdate();
      });
    });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [], authOk: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    // , authOk: state.data.map(n => n.access)
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} style={{ height: "60%" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper} style={{ height: "70%" }}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.id}
                      </TableCell>
                      <TableCell align="right">{n.nome}</TableCell>
                      <TableCell align="right">{n.sobrenome}</TableCell>
                      <TableCell align="right">{n.email}</TableCell>
                      <TableCell align="right">{n.datanasc}</TableCell>
                      <TableCell align="right">{n.access}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          style={{ height: "15%", marginTop: "5px" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <div id="action-buttons" style={{ height: "40px" }}>
          <Button id="act-btn" onClick={() => this.authEspecialAccess()}>
            Autorizar Acesso Especial
          </Button>
          <Button id="act-btn" onClick={() => this.unauthEspecialAccess()}>
            Desautorizar Acesso Especial
          </Button>
        </div>
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

        <Dialog
          open={this.state.openDialog}
          onClose={() => this.handleDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmar Remoção ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja remover os usuários selecionados ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()} color="primary">
              Não
            </Button>
            <Button onClick={() => this.rmUser()} color="primary">
              Sim
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          hidden="true"
          id="btnRm"
          onClick={() => this.handleDialogClose()}
        />
      </Paper>
    );
  }

  // Checa se quando solicitada uma ação, há usuários selecionados
  checkSelected() {
    if (this.state.selected.length < 1) {
      return false;
    } else {
      return true;
    }
  }

  authEspecialAccess() {
    console.log(this.state.data);

    let authList = this.tojsonArray(),
      ok = true;
    this.state.selected.forEach(element => {
      for (let i = 0; i < this.state.data.length; i++) {
        // eslint-disable-next-line
        if (element == this.state.data[i].id) {
          // eslint-disable-next-line
          if (this.state.data[i].access == "Sim") {
            ok = false;
          }
        }
      }
    });

    if (!this.checkSelected()) {
      this.snackbarMessage = "Selecione pelo menos um usuário para alterar o nível acesso";
      this.handleSnackClick();
      return;
    }

    if (ok) {
      fetch(URLs.LibraryURL + "management/manager/adm-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: authList
      })
        .then(response => {
          this.populateTable();
          this.setState({
            selected: []
          });
          this.forceUpdate();
          this.snackbarMessage = "Alteração de acesso bem-sucedida";
          this.handleSnackClick();
        })
        .catch(Response => {
          this.snackbarMessage = "Problema no servidor ou na rede";
          this.handleSnackClick();
        });
    } else {
      this.setState({
        selected: []
      });
      this.snackbarMessage =
        "Algum(s) dos usuários selecionados já possuem autorização especial";
      this.handleSnackClick();
    }
  }
  unauthEspecialAccess() {
    let authList = this.tojsonArray(),
      ok = true;
    this.state.selected.forEach(element => {
      for (let i = 0; i < this.state.data.length; i++) {
        // eslint-disable-next-line
        if (element == this.state.data[i].id) {
          // eslint-disable-next-line
          if (this.state.data[i].access == "Não") {
            ok = false;
          }
        }
      }
    });

    if (!this.checkSelected()) {
      this.snackbarMessage = "Selecione pelo menos um usuário para alterar o nível acesso";
      this.handleSnackClick();
      return;
    }
    
    if (ok) {
      fetch(URLs.LibraryURL + "management/manager/adm-unauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: authList
      })
        .then(response => {
          this.populateTable();
          this.setState({
            selected: []
          });
          this.forceUpdate();
          this.snackbarMessage = "Alteração de acesso bem-sucedida";
          this.handleSnackClick();
        })
        .catch(Response => {
          this.snackbarMessage = "Problema no servidor ou na rede";
          this.handleSnackClick();
        });
    } else {
      this.setState({
        selected: []
      });
      this.snackbarMessage =
        "Algum(s) dos usuários selecionados já possuem autorização de usuário";
      this.handleSnackClick();
    }
  }

  static removerUsuario() {
    document.getElementById("btnRm").click();
  }

  rmUser() {
    this.setState({
      openDialog: false
    });
    fetch(URLs.LibraryURL + "management/manager/remove-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: this.tojsonArray()
    })
      .then(response => {
        this.populateTable();
        this.setState({
          selected: []
        });
        this.forceUpdate();
        this.snackbarMessage = "Usuário(s) Removido(s)";
        this.handleSnackClick();
      })
      .catch(Response => {
        this.snackbarMessage = "Problema no servidor ou na rede";
        this.handleSnackClick();
      });
  }

  tojsonArray() {
    let users = "[";
    for (let i = 0; i < this.state.selected.length - 1; i++) {
      users += '{"id":' + this.state.selected[i] + "},";
    }
    users +=
      '{"id":' + this.state.selected[this.state.selected.length - 1] + "}]";
    return users;
  }
}

AccessAdm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccessAdm);
