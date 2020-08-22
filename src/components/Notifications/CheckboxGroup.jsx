import React, { Component } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      text: false,
      email: false
     }
  }
   handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentDidMount = () => {
    this.setState({
      text: this.props.text || false,
      email: this.props.email || false
    })
  }

  render() {
    return (
      <FormControl component="fieldset" style={groupStyle}>
        <FormLabel component="legend">{this.props.formLabel || 'no label'}</FormLabel>
        <FormHelperText>{this.props.formHelperText || null}</FormHelperText>
        <FormGroup>
          <FormControlLabel style={checkLineStyle}
            control={
              <Checkbox
                checked={this.state.text}
                onChange={this.handleChange('text')}
                value="text"
              />
            }
            label="Text message"
          />
          <FormControlLabel style={checkLineStyle}
            control={
              <Checkbox
                checked={this.state.email}
                onChange={this.handleChange('email')}
                value="email"
              />
            }
            label="Email"
          />
        </FormGroup>
      </FormControl>
    );
  }
}

const groupStyle = {
  display: 'block',
  marginBottom: '24px'
}

const checkLineStyle = {
  // backgroundColor: 'pink',
  // paddingTop: '-6px'
}
  
export default CheckboxGroup;