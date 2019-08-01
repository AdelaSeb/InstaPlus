import React, { Fragment } from 'react'
import { connect } from 'react-redux'
// import Post 

const Feed = ({ feed }) => {
  let len = feed.length
 //  connect posts to display

  let nothingMssg =
    "Looks like you're new, follow people to fill up your homepage or post from above!"

  return (
    <Fragment>
      <div className="posts_div" style={{ marginTop: len == 0 ? 10 : 0 }}>
        <MapPosts posts={map_feed} nothingMssg={nothingMssg} />
      </div>

      {len != 0 && <End />}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  //feed: state.Post.feed,
})

export default connect(mapStateToProps)(Feed)
