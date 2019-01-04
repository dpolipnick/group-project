// Vendors
import React, {Component} from 'react';
import { connect } from 'react-redux';
// Styles
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
// import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styling = theme => ({
   root: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing.unit * 2,
   },
   alignCenter: {
      textAlign: 'center'
   },
});

class ColumnDropdown extends Component {

   state = {
      label: '',
    };

    handleChange = (name) => event => {
      this.setState({ [name]: event.target.value });
    };
   
   render(){
     
      return(
         
         <div>

            <FormControl variant="filled" className={this.props.formControl}>
               <InputLabel htmlFor="filled-label-native-simple"></InputLabel>
               <Select
                  native
                  value={this.state.label}
                  onChange={this.handleChange('label')}
                  input={<FilledInput name="label" id="filled-label-native-simple" />}
               >
                  <option key='default' disabled={true} value="">-- Select Column Label --</option>
                  <option value={10}>Employee's Unique ID</option>
                  <option value={30}>Employee's Date of Birth</option>
                  <option value={10}>Employee's Date of Hire</option>
                  <option value={10}>Union or Non-Union</option>
                  <option value={10}>Employee's Role</option>
                  <option value={10}>Employee's Salary</option>
                  <option value={30}>Employee's Gender</option>
                  <option value={30}>Employment Status (retired, active, LOA, etc.)</option>
                  <option value={40}>Employee's State of Residence</option>
                  <option value={40}>Company Code</option>
               </Select>
               <FormHelperText>Select the correct label for the information in the column below.</FormHelperText>
            </FormControl>

         </div>
      );
   }
}

// NativeSelects.propTypes = {
//    classes: PropTypes.object.isRequired,
//  };

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withStyles(styling)(ColumnDropdown));