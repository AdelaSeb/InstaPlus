import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Posts from '../posts/Posts';


class Dashboard extends Component {

  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Posts />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

