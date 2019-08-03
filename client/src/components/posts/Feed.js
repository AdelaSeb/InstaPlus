import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import { getFeed } from '../../actions/postActions';

class Feed extends Component {
  componentDidMount() {
    //this.props.getPosts();
    this.props.getFeed();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
               {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  getFeed: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getFeed })(Feed);
