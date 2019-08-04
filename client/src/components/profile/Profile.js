import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle, deleteAccount } from '../../actions/profileActions';
import Posts from '../posts/Posts';
import App from '../../App.css'


class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  onDeleteClick(e) {
    this.props.deleteAccount(this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {

      // if (profile === null || loading) {
      //   profileContent = <Spinner />;
      // } else {
  
        if (Object.keys(profile).length > 0) {
          profileContent = (
            <div className="container">
              <div className="row bkground">
                <div className="col-md-2">
                  <div className="spacerLine"></div>
                    <img
                      className="rounded-circle"
                      src={profile.user.avatar}
                      alt=""
                    />
                    <h1 className="display-4 text-center">{profile.user.name}</h1> 
                  </div>
                  <div className="col-md-1">

                  </div>
                <div className="col-md-6">
                    <div className="spacerMin"></div>
                    
                    <h3 className="text-left">Bio</h3>
                    <span>{profile.bio}</span>
                    <h3 className="text-left">Website</h3>
                    <span>{profile.website}</span>
                    <div className="spacerMin"></div>
                    {/* <h3 className="text-left">Number of posts</h3>
                    <span>{profile.numOfPosts}</span>
                    <h3 className="text-left">Following</h3>
                    <span>{profile.following}</span>
                    <h3 className="text-left">Followers</h3>
                    <span>{profile.followers}</span> */}
                </div> 
                <div className="col-md-3">
                <div className="spacerMin"></div>
                <div>
                <Link to="/edit-profile" className="btn btn-outline-danger waves-effect">
                      <i className="fas fa-user-circle mr-1" /> Edit Profile
                    </Link>
                    </div>
                    <div className="spacerMin"></div>
                    <button
                      onClick={this.onDeleteClick.bind(this)}
                      className="btn btn-danger"
                    >
                      Delete My Account
                    </button>                    
                  </div>             
              
            </div>
            <div className="spacerMin"></div>
              <Posts />
            </div>
          );
        } else {
          // User is logged in but has no profile
          profileContent = (
            <div>
              <p className="lead text-center text-muted">Welcome </p>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-outline-danger waves-effect">
                Create Profile
              </Link>
            </div>
          );
      //  }
      }
      
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle, deleteAccount })(Profile);