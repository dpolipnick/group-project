// Vendors
import React, {Component} from 'react';
import { connect } from 'react-redux';
// Styles
import { withStyles, withTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// Components
import ColumnDropdown from './ColumnDropdown'
import { red } from '@material-ui/core/colors';

const styling = theme => ({
   alignCenter: {
      textAlign: 'center'
   },
   tableFormat: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 50,
      maxWidth: 1000
   },
   width: {
      width: 570,
      marginLeft: 'auto',
      marginRight: 'auto'
   },
   //styling for employer column page
   columnPage: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: '2%',
      marginRight: '2%',
      padding: 10,
      overflowX: 'auto',
      backgroundColor: '#D4D2D2',
   },
   instructions: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: '2%',
      marginRight: '2%',
      padding: 10,
      overflowX: 'auto',
   },
   //styling for employer columns
   columns: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: '1%',
      marginRight: '1%',
      padding: 10,
      overflowX: 'auto',
   },
   labels: {
      backgroundColor: '#1a3d50',
      color: '#ffffff',
   },
});

class EmployeeDataTable extends Component {

   state = {
      //columns: [],
   }

   renderFunction = () => {
      this.setState({})
   }

   // componentDidMount= () => {
   //    this.calculateColumns();
   // }

   // // counts how many columns to render on the DOM and columns to create in local state
   // calculateColumns= () => {
   //    let index = -1;
   //    let columnCount = this.props.employeesReducer[0].length;
   //    // console.log('Inside calculateColumns, # of columns:', columnCount);
   //    this.props.employeesReducer[0].forEach(column => {
   //       index = index +1;
   //       this.setState({
   //          columns: [...this.state.columns, index]
   //       });
   //    });
   // }

   // fetchEmployeeData = () =>{
   //    // this.props.dispatch({type: 'GET_EMPLOYEE_DATA', payload: this.state.company_id})
   //    // this.props.dispatch({type: 'GET_EMPLOYEE_DATA'})
   //    console.log('Inside fetchEmployeeData of EmployeeDataTable running GET_EMPLOYEE_DATA');
   // }
   
   // componentWillMount(){
   //    // this.setState({
   //    //    company_id: this.props.user.company_id
   //    // });
   //    //this.fetchEmployeeData();
   //    // this.props.dispatch({type: 'GET_EMPLOYEE_DATA'})
   // }
   
   render(){

      // let index = -1;
      // let columnCount = this.props.employeesReducer[0].length;
      // // console.log('Inside calculateColumns, # of columns:', columnCount);
      // this.props.employeesReducer[0].forEach(column => {
      //    index = index +1;
      //    this.setState({
      //       columns: [...this.state.columns, index]
      //    });
      // });

      const {classes} = this.props
      let tableHeadInsert;
      let tableBodyInsert;
      let tableBodyInsert2;
      let columnsArr = []
      console.log(this.state)

      if(this.props.employeesReducer.length === 0){
         tableHeadInsert = <br></br>
         tableBodyInsert = <p className={classes.alignCenter}>Nothing to display...</p>
         //this.props.dispatch({type: 'GET_EMPLOYEE_DATA'})
      }
      if (this.props && this.props.employeesReducer.length > 0 && this.props.columnsReducer.length === 0){
         this.props.dispatch({type:'SET_COLUMNS', payload: this.props.employeesReducer[0].length})
      }
      if(this.props && this.props.employeesReducer.length > 0 && this.props.columnsReducer.length > 0){

         // tableHeadInsert = for (const column in table) {
         //    if (table.hasOwnProperty(column)) {
         //       const element = table[column];
               
         //    }
         // }
         
         tableHeadInsert = this.props.employeesReducer[0].map((column, index) =>
            <TableCell><ColumnDropdown index={index} columnRowLength={null} renderFunction={this.renderFunction}/></TableCell>
         );

         tableBodyInsert =  
            <TableRow className={classes.labels}>
               {this.props.columnsReducer.map(column =>
                  <TableCell>{column}</TableCell>
               )}
            </TableRow>;
         
         for(let i = 0; columnsArr.length < 5; i++) {
            columnsArr.push(this.props.employeesReducer[i])
         }
         tableBodyInsert2 = columnsArr.map(employee =>
            <TableRow>
               {employee.map(data => 
                  <TableCell>{data}</TableCell>
               )}
            </TableRow>);       
      
         // tableBodyInsert = this.props.employeesReducer.map(employee =>
         //    <TableRow>
         //       <TableCell>{employee.employer_supplied_unique_id}</TableCell>
         //       <TableCell>{employee.date_of_birth}</TableCell>
         //       <TableCell>{employee.date_of_hire}</TableCell>
         //       <TableCell>{employee.union_status}</TableCell>
         //       <TableCell>{employee.salary_per_year}</TableCell>
         //       <TableCell>{employee.gender}</TableCell>
         //       <TableCell>{employee.status}</TableCell>
         //       <TableCell>{employee.state}</TableCell>
         //       <TableCell>{employee.role}</TableCell>
         //       <TableCell>{employee.employer_supplied_company_code}</TableCell>
         //    </TableRow>)
      }
      
      return(
         <div>
            <Paper className={classes.columnPage} elevation={15}>
               <Paper className={classes.instructions}>
               <h1>Check Your Data</h1>
               <div className={`${classes.width}`}>
                  <p>1. This is only a small sample of the data you have uploaded.</p>
                  <p>2. Please make sure each column dropdown menu matches the data it belongs to below.</p>
               </div>
               </Paper>
               <Paper className={classes.columns} elevation={2}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           {tableHeadInsert}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {tableBodyInsert}
                        {tableBodyInsert2}
                     </TableBody>
                  </Table>
               </Paper>
            </Paper>
            {/* <p>this.state:{JSON.stringify(this.state)}</p>
            <p>this.props.employeesReducer:{JSON.stringify(this.props.employeesReducer)}</p>
            <p>this.props.columnReducer:{JSON.stringify(this.props.columnsReducer)}</p> */}
         </div>
      );
   }
}

const mapStateToProps = state => ({
   deals: state.deals,
   employeesReducer: state.employeesReducer,
   user: state.user,
   columnsReducer: state.columnsReducer
});

export default connect(mapStateToProps)(withStyles(styling)(EmployeeDataTable));