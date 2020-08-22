import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Services from './components/Services';
import Calendar from './components/Calendar';
import Notifications from './components/Notifications';
import Information from './components/Information';
import Hours from './components/Hours';
import Chart from './components/Chart';

import { BUSINESS_ID } from './calendar_secrets.json'

import './App.css';
//----------------Material CSS------------------------
const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

const noUnderline = {
  textDecoration: 'none'
}

//-----------------State------------------------

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      business: {
        name: '',
        services: [],
        hours: [],
        calendarData: {
          maxConcurrentAppointments: 0
        }
      }
    }
  }

//---------------Life Cycle Functions--------------
componentDidMount() {
    this.fetchBusinessData(this.getBusinessId());
  }

//---------------Handle Functions-----------------

handleBusinessInput = (businessPackage) => {
  switch (businessPackage.packageType){
    case 'service':
      this.handleBusinessService(businessPackage);
      break;
    case 'hours':
      this.handleBusinesssHours(businessPackage);
      break;
    default:
      console.log("somebody did something wrong");
  }
}

handleBusinessService = (businessPackage) => {
  console.log(businessPackage);
}

handleBusinesssHours = (businessPackage) => {
  this.setHoursState(businessPackage.hoursInfo);
  this.editHoursDB();
}


//--------------Fetch Functions-------------------

fetchBusinessData = (businessId) => {
    axios.get(`http://localhost:5000/api/business/${businessId}`)
      .then(res => {
        const business = res.data[0]
        console.log("info", res);
        if (!business) throw new Error(`Error fetching data from business ID ${businessId}`)
        this.setState({business: business})
      }).catch(err => {
        console.error(err)
      })
  }

//--------------Business Functions----------------

  getBusinessId = () => {
    // This method would normally get the business ID from login/cookie
    return BUSINESS_ID
  }

//--------------Service Functions-----------------

  updatedService = (updatedService) => {
    const newState = {...this.state.business, services: updatedService}
    this.setState({business: newState})
  }

//--------------Hours Functions-------------------

setHoursState = (newHours) => {
  const newHoursState = this.state.business.hours.map((hour) => {
    if(hour.day === newHours.day)
      return newHours;
    else
      return hour;
  });
  const HoursState = {...this.state.business, hours: newHoursState};
  this.setState({business: HoursState});
}

editHoursDB = () => {
  const hours = this.state.business.hours;
  axios.put(`http://localhost:5000/api/business/123456123456123456123456/hours`,
    {data: hours})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err)
    })
}

//---------------This renders the User Panel------------------------
  render() {
    const { classes } = this.props;
    return (
        <BrowserRouter className="App">

          <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
              <Toolbar>
                <Typography variant="title" color="inherit" noWrap>
                  {this.state.business.name || 'PBJ Scheduler'}
                </Typography>
              </Toolbar>
            </AppBar>

            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.toolbar} />
              <List>
                <Link to="/calendar" style={noUnderline}>
                  <ListItem button>
                    <ListItemText primary="Calendar"></ListItemText>
                  </ListItem>
                </Link>

                <Link to="/services" style={noUnderline}>
                  <ListItem button>
                    <ListItemText primary="Services"></ListItemText>
                  </ListItem>
                </Link>

                <Link to="/hours" style={noUnderline}>
                  <ListItem button>
                    <ListItemText primary="Hours"></ListItemText>
                  </ListItem>
                </Link>

                <Link to="/notifications" style={noUnderline}>
                  <ListItem button>
                    <ListItemText primary="Notifications"></ListItemText>
                  </ListItem>
                </Link>

                <Link to="/reports" style={noUnderline}>
                  <ListItem button>
                    <ListItemText primary="Reports"></ListItemText>
                  </ListItem>
                </Link>

                <Link to="/information" style={noUnderline}>
                  <ListItem button>
                    <ListItemText primary="Information"></ListItemText>
                  </ListItem>
                </Link>
              </List>

            </Drawer>

            <main className={classes.content}>
              <div className={classes.toolbar} />

              <Switch>
                <Route exact path='/' render={() => (
                  <Redirect to='/calendar'/>
                )} />
                <Route path='/calendar' render={() => <Calendar business={this.state.business}/>} />
                <Route path='/notifications' component={Notifications} />
                <Route path='/information' render={() => <Information business={this.state.business} />} />
                <Route path='/services' render={() => <Services data={this.state} updateService={this.updatedService}/>} />
                <Route path='/hours' render={() =>
                  <Hours
                    businessHours={this.state.business.hours}
                    handleBusinessInput={this.handleBusinessInput}
                  />}
                />
                <Route path='/reports' component={Chart} />
                <Route render={() => { return (<div>404! :(</div>) }} />
              </Switch>

            </main>
          </div>

        </BrowserRouter>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
