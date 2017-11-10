import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import { upVotePost, downVotePost } from '../actions'

class Score extends Component {
	componentDidMount() {
		const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
		if(post) {
			this.setState({ post })
		}
	}

  changeScore = (type) => {
		const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
		if (post.hasVoted !== true) {
	    if(type === 'upvote') {
				this.props.upVotePost({ postId: post.id })
			} else if (type === 'downvote') {
				this.props.downVotePost({ postId: post.id })
			}
		}
  }

  render() {
		const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
  	return (
  		<Row>
	      <Col xs={12} onClick={() => this.changeScore('upvote')}>
	        <Glyphicon className='post-arrow' glyph='menu-up' />
	      </Col>

	      <Col xs={12}>
	        <h3 className='post-score'>{post && post.voteScore}</h3>
	      </Col>

	      <Col xs={12} onClick={() => this.changeScore('downvote')}>
	        <Glyphicon className='post-arrow' glyph='menu-down' />
	      </Col>
	    </Row>
  	)
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVotePost: data => dispatch(upVotePost(data)),
    downVotePost: data => dispatch(downVotePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Score)
