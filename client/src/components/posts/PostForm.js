import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import classnames from 'classnames';
import Posts from './Posts'

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      caption: '',
      location: '',
      country: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //if (this.props.auth.isAuthenticated) {
      //this.props.history.push('/dashboard');
    //}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      photo: this.state.photo,
      caption: this.state.caption,
      location: this.state.location,
      country: this.state.country,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ 
            photo: '',
           caption: '',
           location: '',
           country:''
          });
    //this.props.history.push('/dashboard');
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-danger text-white">New post</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit} noValidate>
              <div className="form-group">
                  <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.photo})} 
                  placeholder="Upload Photo(url)" name="photo" value={this.state.photo} onChange={this.onChange} required /> 
                  {errors.photo && (
                      <div className="invalid-feedback">
                          {errors.photo}
                      </div>
                  )}                  
              </div>  

              <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Caption"
                    name="caption"
                    value={this.state.caption}
                    onChange={this.onChange}
                    error={errors.caption}
                  />
              </div>

              <div className="form-group">
                <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.location})} 
                placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} />   
              </div>

              <div className="form-group">
                <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.country})} 
                placeholder="Country" name="country" value={this.state.country} onChange={this.onChange} />                                 
              
              </div>
              <button type="submit" className="btn btn-outline-danger waves-effect">
                Add Post
              </button>
            </form>
          </div>
        </div>
      </div>

      <Posts />
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
