import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import { upVotePost, downVotePost } from '../actions'

class Score extends Component {
	componentDidMount() {
		const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
		if(post) {
			this.setState({ score: post.voteScore })
		}
	}

	componentDidUpdate(prevProps) {
		const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
		const prevPost = prevProps.posts.filter(post => post.id === prevProps.postId)[0]
		console.log('post', post)
		if (post !== prevPost) {
      this.setState({ score: post.voteScore })
    }
  }

  changeScore = (type) => {
		if (this.state.post.hasVoted !== true) {
	    if(type === 'upvote') {
				this.props.upVotePost({ postId: this.state.post.id })
			} else if (type === 'downvote') {
				this.props.downVotePost({ postId: this.state.post.id })
			}
		}
  }

  render() {
		console.log('this.props', this.props)
  	return (
  		<Row>
	      <Col xs={12} onClick={() => this.changeScore('upvote')}>
	        <Glyphicon className='post-arrow' glyph='menu-up' />
	      </Col>

	      <Col xs={12}>
	        <h3 className='post-score'>{this.state && this.state.score}</h3>
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
