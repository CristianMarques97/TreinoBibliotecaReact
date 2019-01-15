import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProfileManager from './profile-management';

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
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
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
            <Tab label="Histórico de Empréstimos"/>
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><ProfileManager></ProfileManager></TabContainer>}
        {value === 1 && <TabContainer>tab 2</TabContainer>}
        {value === 2 && <TabContainer>tab 3</TabContainer>}
      </div>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MyProfile);
