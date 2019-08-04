import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { PropTypes } from 'prop-types';
// import { connect } from 'react-redux';

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">InstaPlus</h1>
                                <p className="lead">
                                {' '}
                                Share photos with the world
                                </p>
                                
                                <Link to="/register" className="btn btn-outline-danger waves-effect mr-4">Sign Up</Link>
                                <Link to="/login" className="btn btn-outline-danger waves-effect ">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;