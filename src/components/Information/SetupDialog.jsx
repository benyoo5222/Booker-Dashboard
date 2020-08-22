import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

const setupUrlStylesString = '"background-color:#0AF;color:#fff;padding:6px 12px;border:1px solid #08B;text-decoration:none;font:bold 1.1em Arial"'
const setupUrlStylesObj = {
  backgroundColor:'#0AF',
  color:'#fff',
  padding:'6px 12px',
  border:'1px solid #08B',
  textDecoration:'none',
  font:'bold 1.1em Arial'
}
const setupUrlWithStyles = `<a href="#" onClick="MyWindow=window.open('https://pgoshulak.github.io/pbj-scheduler-widget/123456','MyWindow',width=600,height=300); return false;" style=${setupUrlStylesString}>Book now</a>`
const setupUrlPlain = `<a href="#" onClick="MyWindow=window.open('https://pgoshulak.github.io/pbj-scheduler-widget/123456','MyWindow',width=600,height=300); return false;">Book now</a>`

const styles = {
  codeContainer: {
    whiteSpace: 'nowrap',
    height: '2.2em',
    overflowX: 'scroll',
    marginTop: '8px',
    backgroundColor: '#eee'
  }
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Add the Scheduler to your business website</DialogTitle>
        <DialogContent style={{paddingTop: '6px'}}>
          <DialogContentText>
            Add this code to your website for a styled button like this: &nbsp;&nbsp;&nbsp;
            <a href='#' style={setupUrlStylesObj}>Book Now</a>
          </DialogContentText>

          <div style={styles.codeContainer}>
            <code>{setupUrlWithStyles}</code>
          </div>
          <br/><br/>
          <DialogContentText>
            Add this code to your website for a plain link like this: &nbsp;&nbsp;&nbsp;
            <a href="#">Book Now</a>
          </DialogContentText>
          <div style={styles.codeContainer}>
            <code>{setupUrlPlain}</code>
          </div>

        </DialogContent>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        {/* <div>
          <IconButton aria-label="Comments">
            <CodeIcon name="code-setup" value="code-setup" onClick={this.handleClickOpen}/>
          </IconButton>
        </div> */}
        <Typography variant='caption'>
          Ready to add PBJ-scheduler to your website? <a target="#" onClick={this.handleClickOpen} style={linkStyle}>Click here</a> to get started
        </Typography>
        <SimpleDialogWrapped
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const linkStyle = {
  color: 'rgb(255,0,80)',
  textDecoration: 'underline',
  cursor: 'pointer'
}

export default SimpleDialogDemo;