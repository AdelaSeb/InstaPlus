import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">InstaPlus</h1>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                            </form>
                                <div className="btn btn-lg btn-dark mr-2">
                                Sign Up
                                </div>
                                <div className="btn btn-lg btn-light">
                                Login
                                </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
};

export default Navbar;
