const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');



// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile){
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
)

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.numOfPosts) profileFields.numOfPosts=req.body.numOfPosts;
    if (req.body.following) profileFields.following = req.body.following;
    if (req.body.followers) profileFields.followers = req.body.followers;
    

    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
        .then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
         // Save Profile
         new Profile(profileFields)
         .save()
         .then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @route   POST api/profile/followers/:id
// @desc    Create follow users
// @access  Private
router.post(
  '/followers/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
     
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (
                    profile.followers.filter(follower => follower.user.toString() === req.params.curr_user)
                      .length > 0
                  ) {
                    return res
                      .status(400)
                      .json({ alreadyAFollower: 'User is already a follower' });
                  }
        else{
          profile.followers.unshift({ user: req.params.curr_user });
          profile.save().then(profile => res.json(profile));
        }
      });

    Profile.findOne({user:req.params.curr_user})
     .then( profile2 => {
            if(profile2.following.filter(following=>following.user.toString()===req.user.id).length>0)
            {
              return res
              .status(400)
                      .json({ alreadyfollowing: 'You are already following' });
            }
            else{
              profile2.followering.unshift({ user: req.user.id });
              profile2.save().then(profile2 => res.json(profile2));
            }
     }) ;
   }
);


// @route   POST api/posts/unfollowers/:id
// @desc    Delete follow users
// @access  Private
router.post(
  '/unfollowers/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if(profile.followers.filter(follower => follower.user.toString() === req.user.id).length===0)
      {
        return res
              .status(400)
              .json({ notliked: 'The user has not yet followed you.' });
      }
      else{
           const removeIndex = profile.followers
            .map(item => item.user.toString())
            .indexOf(req.params.curr_user);

          // Splice out of array
          profile.followers.splice(removeIndex, 1);

          // Save
          profile.save().then(profile => res.json(profile));
      }})

      Profile.findOne({user:req.params.curr_user}).then(
        profile2=>{
        if(profile2.following.filter(following => following.user.toString() === req.user.id).length===0)
        {
        return res
              .status(400)
              .json({ notfollowed: 'The user has not yet followed you.' });
       }
        else{
           const removeIndex = profile2.following
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          profile2.following.splice(removeIndex, 1);

          // Save
          profile2.save().then(profile2 => res.json(profile2));
      }
        }
      ) 
    
  }
);  


module.exports = router;