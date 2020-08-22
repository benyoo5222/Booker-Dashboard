import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


import Services from './services.js'
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  button: {
    float: 'right'
  },
  table: {
    maxWidth: '100%',
  },
});

class Serviceslist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentServices: [],
      editServices: {
        type: "",
        billingCode: "",
        description: "",
        priceCents: 0,
        durationMin: 0
      }
    }
  }

  componentDidMount(){
    console.log(this.props.data);
  }
  openForm = (value) => {
    if (value === "Add Service") {
      const type = {...this.state.editServices, type: "Add"};
      this.setState({currentServices: [], open: true, editServices: type})
    } else {
      const currentServices = this.props.data.business.services.filter(service => service.billingCode === value)
      const type = {...this.state.editServices, type: "Edit"};
      this.setState({open: true, currentServices: currentServices, editServices: type})
    }
  }
  closeForm = (e) => {
    this.setState({open: false})
  }
  handleChange = (event) => {
    const {name, value} = event.target;
    const billingCode = this.state.currentServices.map(serviceId => serviceId.billingCode)
    if (this.state.editServices.type === "Add") {
      const newBillingCode = this.props.data.business.services.length;
      const editedService = {...this.state.editServices, [name]: value, billingCode: newBillingCode + 1}
      this.setState({editServices: editedService})
    } else {
      const editedService = {...this.state.editServices, [name]: value, billingCode: billingCode[0]}
      this.setState({editServices: editedService})
    }

  }
  sendEdit = () => {
    // Need to make sure that it doens't edit if no fields were entered.
      const filteredService = this.props.data.business.services.filter( value => value.billingCode !== this.state.editServices.billingCode)
      const changingServices = [...filteredService, this.state.editServices]
      changingServices.sort(function(a, b) {
        return a.billingCode - b.billingCode;
      })
      console.log(changingServices)

    axios.put(`http://localhost:5000/api/business/123456123456123456123456/services`,
      {data: changingServices})
      .then(res => {
        console.log(res);
        this.setState({open: false})
        this.props.updateService(changingServices)
      })
      .catch(err => {
        console.error(err)
      })

  }

  deleteService = () => {
    const currentService = this.state.currentServices.map(id => id.billingCode)
    const filteredService = this.props.data.business.services.filter( value => value.billingCode !== currentService[0])
    axios.put(`http://localhost:5000/api/business/123456123456123456123456/services`,
      {data: filteredService})
      .then(res => {
        console.log(res);
        this.setState({open: false})
        this.props.updateService(filteredService)
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const each_service = <Services data = {this.props.data.business} openForm={this.openForm} updateService={this.props.updateService}/>
    const { classes } = this.props;
    const currentServiceInfo = this.state.currentServices[0]
    let description = "";
    let duration = "";
    let price = "";
    if (currentServiceInfo) {
      description = currentServiceInfo.description;
      duration = currentServiceInfo.durationMin;
      price = currentServiceInfo.priceCents;
    }
    const totalPrice = this.props.data.business.services.reduce((total, service) => {
        return total + service.priceCents
      }, 0)
    const totalDuration = this.props.data.business.services.reduce((total, service) => {
        return total + service.durationMin
      }, 0)

    return (
      <main>
      <Button className={classes.button} variant="outlined" color="primary" onClick={this.openForm.bind(this, "Add Service")}>
        Add Service
      </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Service Description</TableCell>
              <TableCell numeric padding={'dense'}>Duration (min)</TableCell>
              <TableCell numeric padding={'dense'}>Price ($)</TableCell>
              <TableCell padding={'dense'}>Edit</TableCell>
            </TableRow>
          </TableHead>
        {each_service}
          <TableFooter>
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
              <TableCell numeric></TableCell>
              <TableCell numeric></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div>

          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.state.open}
          >
            <DialogTitle>{this.state.currentServices.length > 0 ? this.state.currentServices.map(service => service.description) : "Add a service"}</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="name-simple" >Service Description</InputLabel>
                  <Input
                    id="name-simple"
                    name="description"
                    placeholder={description}
                    onBlur={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    name="durationMin"
                    id="time"
                    label="Max Time"
                    type="number"
                    onBlur={this.handleChange}
                    placeholder={String(duration)}
                    className={classes.textField}
                    inputProps={{
                      step: 5, // 5 min
                    }}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    name= "priceCents"
                    label="Price"
                    type="number"
                    onBlur={this.handleChange}
                    placeholder={String((price/100).toFixed(2))}
                    id="formatted-numberformat-input"
                  />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeForm} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteService} color="secondary">
                Delete
              </Button>
              <Button onClick={this.sendEdit} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    )
  }
}

Serviceslist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Serviceslist);
