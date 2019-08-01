import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
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
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
                <div className="text-center">
                    <h1 className="display-4 text-center">{profile.user.name}</h1>
                    <h3 className="text-center text-info">Bio</h3>
                    <span>{profile.bio}</span>
                    <h3 className="text-center text-info">Website</h3>
                    <span>{profile.website}</span>
                    <h3 className="text-center text-info">Number of posts</h3>
                    <span>{profile.numOfPosts}</span>
                    <h3 className="text-center text-info">Following</h3>
                    <span>{profile.following}</span>
                    <h3 className="text-center text-info">Followers</h3>
                    <span>{profile.followers}</span>
                </div>              
            </div>
          </div>
        </div>
      );
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

export default connect(mapStateToProps, { getProfileByHandle })(Profile);