import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styling = theme => ({
   sizeImg: {
      height: 280,
      width: 200
   },
   inlineBlock:{
      float: 'left',
   },
   customBtn: {
      height: 10,
      width: 80,
      fontWeight: 'bold',
      fontSize: 10,
      color: 'white'
   },
   backgroundGray: {
      background: 'dimgray'
   },
   backgroundGreen: {
      background: 'forestgreen'
   },
   sendBtn: {
      width: 100,
      background: 'royalblue'
   },
})


  // This was test code to test the post that creates a new quote
  // componentDidMount = () => {
  //   //this.fetchProviders();
  //   console.log("ENTERING POST TEST ONMOUNT");
  //   axios.post('/api/quotes', [
  //     { deal_id: 1,
  //       provider_id: 1 },
  //     { deal_id: 2,
  //       provider_id: 2},
  //       { deal_id: 3,
  //         provider_id: 3},
  //         { deal_id: 4,
  //           provider_id: 4},
  //     ]);
  // };

  const newState = {
   open: false,
   confirmBtn: false,
   sendBtn: false,
   providerObj: {},
   
   }


  let detailObjArr = []
  class SendToProvider extends Component {

   state = newState;
  
   componentDidMount(){
      this.setProviders();
      //  this.props.dispatch( { type: 'FETCH_PROVIDERS' } );
   }

   //function to populate this component's state with all of the providers
   setProviders = () => {
      let theProviderObj = {};
      // let detailObjArr = []
      for(let provider of this.props.providerReducer.providerReducer){
         console.log("provider in for loop: ", provider);
         theProviderObj[provider.name] = {
               status: null,
               name: provider.name,
               company: provider.company_id
            }
         
         
       }
       console.log(theProviderObj)
      //  console.log(detailObjArr)
       this.setState({
          providerObj: theProviderObj
       })
   }
   
   handleOpenClick = () => {
      this.setState({open: true});
   };
  
   handleCloseClick = () => {
      this.setState({open: false});
   };
   
   handleChange = (providerId) => {
      return (event) => {
         if (this.state.providerObj[event.target.name].status === null){
            this.setState({
               confirmBtn: true,
               providerObj: {
                  ...this.state.providerObj,
                  [event.target.name]: {
                     status: event.target.value,
                     provider_id: providerId,
                  }
               },
            });
         }
         else {
            this.setState({
               providerObj: {
                  ...this.state.providerObj,
                  [event.target.name]: null
               },
            });
         }
      }  
   }

   confirmUpdate = () => {
      // this.props.dispatch({type:'POST_TAGS' , payload: {project_id: this.props.theProject.id, tagInfo: this.state}})
      let providerObjValues = Object.values(this.state.providerObj)
      console.log(providerObjValues);
      if(providerObjValues.includes("sendTo") === false){
         alert("Please select at least 1 provider")
      }
      else {

        //axios.post('/api/quotes', [
          //     { deal_id: 1,
          //       provider_id: 1 },
          //     { deal_id: 2,
          //       provider_id: 2},
          //       { deal_id: 3,
          //         provider_id: 3},
          //         { deal_id: 4,
          //           provider_id: 4},
          // ]);


         this.setState({open: false});

      }
   }
   
   render(){
      
      const {classes} = this.props;
      let checkBoxes; // will be used in the JSX
      console.log(this.state);
      
      //loop through theProviderObj in state to get it's keys, a.k.a the provider names
      if (this.state.providerObj){
         // let providerObjArr = []
         // providerObjArr.push(this.state.providerObj)
         // console.log(providerObjArr)
         console.log(this.state.providerObj.length)
         let providerObjKeys = Object.entries(this.state.providerObj)
         console.log (providerObjKeys);
         checkBoxes = providerObjKeys.map( provider => <div>
            <input type="checkbox" id="" > </div> 
            {/* <FormControlLabel
               control={<Checkbox checked={this.state.providerObj[0]} onChange={this.handleChange()} value="sendTo" />}
               label={provider}
               name={provider}
            />*/} 
         )
      }
      // Conditional rendering to keep the "Confirm" button disabled until a checkbox is selected
      let confirmBtn = this.state.confirmBtn === false ?
      <Button variant="contained" className={classes.customBtn} disabled>Confirm</Button>
      : <Button onClick={this.confirmUpdate} variant="contained"  className={`${classes.customBtn} ${classes.backgroundGreen}`}>Confirm</Button>
      
      return(
         <section>
            <div className={classes.alignCenter}>
               <Button onClick={this.handleOpenClick} className={ `${classes.customBtn} ${classes.backgroundGray}`} variant="contained">Select</Button>
            </div>
            <Dialog
               open={this.state.open}
               onClose={this.handleCloseClick}
               aria-labelledby="dialog-title"
            >
               <DialogTitle id="dialog-title">Send to Providers</DialogTitle>
               <DialogContent>
                  <DialogContentText>Which providers would you like to send this client's data to?</DialogContentText>
                     <FormGroup>
                        <FormControl >
                           <div className={classes.inlineBlock}>
                              {checkBoxes}
                           </div>
                        </FormControl>
                     </FormGroup>
               </DialogContent>
               <DialogActions>
                  {confirmBtn}
                  <Button onClick={this.handleCloseClick} className={`${classes.customBtn} ${classes.backgroundGray}`} >Cancel</Button>
               </DialogActions>
            </Dialog>
         </section>
      );
   }
}

/* {this.props.portfolioReducer.map( (card) => (
               <div>
                  <img src={card.image_url}/>
               </div>
            ))} */

const mapStateToProps = state => ({
   portfolioReducer: state.portfolioReducer,
   user: state.user,
   providerReducer: state.providerReducer
   //communityReducer: state.communityReducer
});

export default connect(mapStateToProps)(withStyles(styling)(SendToProvider));