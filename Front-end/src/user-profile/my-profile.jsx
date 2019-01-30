import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProfileManager from './profile-management';
import AccessAdm from "../administrator/access-adm";
import './profile-manager.css';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

class MyProfile extends React.Component {

  constructor(props) {
    super(props); 
    console.log(this.props.parentState.activeUser);
  }
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log (this.props.parentState.activeUser);
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes,  } = this.props;
     const {value} = this.state;

    return (
      <div className={classes.root}>
        <AppBar className="appTabs" position="static"> 
          <Tabs value={value} onChange={this.handleChange} style = {{backgroundColor: "#000"}}>
            <Tab label="Perfil" />
            <Tab label="Buscar Empréstimos" />
            {!this.props.parentState.activeUser.adm && (<Tab label="Histórico de Empréstimos"/>)}
            {this.props.parentState.activeUser.adm && (<Tab label="Administração de Acesso"/>)}
            {this.props.parentState.activeUser.adm && (<Tab label="Gerencia de acervo"/>)}
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><ProfileManager usuario = {this.props.parentState}></ProfileManager></TabContainer>}
        {value === 1 && <TabContainer>tab 2</TabContainer>}
        {!this.props.parentState.activeUser.adm && (value === 2 && <TabContainer>tab 3</TabContainer>)}
        {this.props.parentState.activeUser.adm && ( value === 2 && <TabContainer><AccessAdm usuario = {this.props.parentState}></AccessAdm></TabContainer> )}
        {this.props.parentState.activeUser.adm && (value === 3 && <TabContainer>tab 5</TabContainer>)}
      </div>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MyProfile);
