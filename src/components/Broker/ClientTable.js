import React, { Component } from 'react';
import {connect} from 'react-redux';

class ClientTable extends Component {

  render() {
    return (
      <div>

      </div>
    );
  }
}


const mapStateToProps = reduxState => {
  return reduxState
};

export default connect(mapStateToProps)(ClientTable);