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
      this.props.dispatch({type: 'SET_COLUMNS', payload: [this.props.index, event.target.value]})
      console.log('dispatch successful')
      console.log(this.props.columnsReducer)
      this.props.renderFunction();
      this.setState({ label: event.target.value });
      console.log('state: ', this.state)
    };
   
   render(){
     
      return(
         
         <div>

            <FormControl  variant="filled" className={this.props.formControl}>
               <InputLabel htmlFor="filled-label-native-simple"></InputLabel>
               <Select
                  
                  native
                  value={this.state.label}
                  onChange={this.handleChange()}
                  input={<FilledInput name="label" id="filled-label-native-simple" />}
               >
                  <option disabled={true} value="">{this.props.columnObject}</option>
                  <option value='employer_supplied_unique_id'>Employee Unique ID</option>
                  <option value='date_of_birth'>Employee Date of Birth</option>
                  <option value='date_of_hire'>Employee Date of Hire</option>
                  <option value='union'>Union or Non-Union</option>
                  <option value='salary_per_year'>Employee Salary</option>
                  <option value='gender'>Employee Gender</option>
                  <option value='status'>Employment Status (retired, active, LOA, etc.)</option>
                  <option value='state'>Employee State of Residence</option>
                  <option value='role'>Employee Role</option>
                  <option value='employer_supplied_company_code'>Company Code</option>
                  <option value='other'>Other</option>
               </Select>
               {/* <FormHelperText>Select the correct label for the information in the column below.</FormHelperText> */}
            </FormControl>

            {/* <p>{JSON.stringify(this.state)}</p> */}

         </div>
      );
   }
}

// NativeSelects.propTypes = {
//    classes: PropTypes.object.isRequired,
//  };

const mapStateToProps = state => ({
   columnsReducer: state.columnsReducer
});

export default connect(mapStateToProps)(withStyles(styling)(ColumnDropdown));