import React, {Component} from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Services extends Component {

  handleOpen = (serviceDetail) => {
    this.props.openForm(serviceDetail)
  }

  render () {
    return (
          <TableBody>
            {this.props.data.services.map(eachService =>
            <TableRow key={eachService.billingCode}>
              <TableCell>
                {eachService.description}
              </TableCell>
              <TableCell numeric padding={'dense'}>{eachService.durationMin}</TableCell>
              <TableCell numeric padding={'dense'}>${(eachService.priceCents/100).toFixed(2)}</TableCell>
              <TableCell padding={'dense'}>
                <IconButton aria-label="Comments">
                  <EditIcon onClick={this.handleOpen.bind(this, eachService.billingCode)}/>
                </IconButton>
              </TableCell>
            </TableRow>)}
          </TableBody>
    )
  }
}

export default Services;
