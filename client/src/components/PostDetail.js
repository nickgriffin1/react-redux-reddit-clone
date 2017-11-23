import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import Score from './Score'
import {
  deletePost,
  deleteComment,
  editComment,
  addComment,
  upVoteComment,
  downVoteComment,
  fetchCommentsIfNeeded
} from '../actions'
import { capitalize, formatDate } from '../utils/shared'

class PostDetail extends React.Component {
  state = {
    showComments: true,
    commenting: false
  }

  componentDidMount() {
    const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
    if(post) {
      this.setState({
        title: post.title,
        body: post.body,
        author: post.author,
        category: capitalize(post.category),
        date: post.timestamp,
        score: post.voteScore
      })
    }

    this.props.fetchCommentsIfNeeded(this.props.postId)
  }

  componentDidUpdate(prevProps) {
    // make sure post is loaded if failed in componentDidMount
    const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
    const prevPost = prevProps.posts.filter(post => post.id === this.props.postId)[0]
    if(post !== prevPost) {
      this.setState({
        title: post.title,
        body: post.body,
        author: post.author,
        category: capitalize(post.category),
        date: post.timestamp,
        score: post.voteScore
      })
    }

    const currentComments = this.props.comments[this.props.postId]
    const prevComments = prevProps.comments[this.props.postId]
    if (currentComments && prevComments) {
      if (currentComments.length !== prevComments.length) {
        console.log('comments', this.props.comments[this.props.postId])
        this.setState({ numComments: currentComments.length })
      }
    } else if (currentComments && prevComments === undefined) {
      this.setState({ numComments: currentComments.length })
    }
  }

  submitNewComment = () => {
    const newComment = {
      id: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
      parentId: this.props.postId,
      timestamp: Date.now(),
      body: this.state.newCommentBody,
      // users not yet implemented
      author: this.props.user || 'you',
      voteScore: 1,
      deleted: false
    }
    this.props.addComment({ postId: this.props.postId, comment: newComment })
    this.setState(prevState => ({
      commenting: false,
      numComments: prevState.numComments + 1
    }))
    // dispatch ADD_COMMENT
  }

  cancelNewComment = () => {
    this.setState({ commenting: false })
  }

  deleteComment = (commentId) => {
    this.setState((prevState) => ({
      numComments: prevState.numComments - 1,
      editing: null
    }))
    this.props.deletePostComment({ postId: this.props.postId, commentId })
  }

  initializeEditComment = (commentId) => {
    this.setState({ editing: commentId })
  }

  updateComment = (comment) => {
    // update the comment body to the input
    comment.body = this.state.temporaryBody
    // call the editComment action
    this.props.editComment({
      postId: this.props.postId,
      comment
    })
    // used to close editing
    this.setState({ editing: null, temporaryBody: null })
  }

  cancelUpdateComment = (commentId) => {
    this.setState({ editing: null })
  }

  handleCommentChange = (event, commentId) => {
    this.setState({ temporaryBody: event.target.value })
  }

  voteComment = (type, commentId, hasVoted) => {
    if (!hasVoted) {
      const { postId } = this.props
      if (type === 'up') {
        this.props.upVoteComment({ postId, commentId })
      } else if (type === 'down') {
        this.props.downVoteComment({ postId, commentId })
      }
    }
  }

  render() {
    // assign some variables to make our lives easier
    const comments = this.props.comments[this.props.postId]
    const post = this.props.posts.filter(post => post.id === this.props.postId)[0]
    return (
      <Row>
        {post && post.deleted ? (
            <h1 className='text-center'>Post Deleted</h1>
          ) : (
            <div>
              <Col xs={12} lg={8} lgOffset={2} className='post-detail'>
                <Row>
                  <Col xs={1}>
                    <Score postId={this.props.postId} />
                  </Col>
                  <Col xs={11}>
                    <Row>
                      <Col xs={7}>
                        <h3 className='post-detail-title'>{this.state.title}</h3>
                      </Col>
                      <Col xs={2}>
                        <Link to={'/' + this.props.category + '/' + this.props.postId + '/edit/'}>
                          <Button style={{ float: 'right'}}>
                            <h5>
                              <Glyphicon bsStyle='primary' glyph='pencil' /> Edit
                            </h5>
                          </Button>
                        </Link>
                      </Col>
                      <Col xs={2}>
                        <Button
                          bsStyle='danger'
                          onClick={() => this.props.deletePost({ postId: this.props.postId })}
                        >
                          <h5>
                            <Glyphicon glyph='remove' /> Delete
                          </h5>
                        </Button>
                      </Col>
                    </Row>
                    <h4 className='post-detail-body'>{this.state.body}</h4>
                    <h4 className='post-detail-author'><Glyphicon glyph='user' /> {this.state.author}</h4>
                    <h4 className='post-detail-category'><Glyphicon glyph='list' /> {this.state.category}</h4>
                    <h4 className='post-detail-time'><Glyphicon glyph='time' /> {formatDate(this.state.date, true)}</h4>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} lg={8} lgOffset={2} className='post-comments'>
                <Row>
                  <Col xs={10} xsOffset={1}>
                    {this.state.commenting === true ?
                      <Row>
                        <Col xs={9}>
                          <input
                            type='text'
                            style={{ width: '100%', color: 'black' }}
                            onChange={(event) => this.setState({ newCommentBody: event.target.value })}
                          />
                        </Col>
                        <Col xs={3}>
                          <Button
                            bsStyle='success'
                            style={{ marginRight: '1rem' }}
                            onClick={this.submitNewComment}
                          >Submit</Button>
                          <Button bsStyle='warning' onClick={this.cancelNewComment}>Cancel</Button>
                        </Col>
                      </Row>:
                      <Button bsStyle='primary' onClick={() => this.setState({ commenting: true })}>
                        <Glyphicon glyph='plus' /> Add a Comment
                      </Button>
                    }
                    <hr />
                  </Col>
                  <Col xs={10} xsOffset={1}>
                    <Row>
                      <Col xs={10}>
                        {this.state.numComments || 0} Comments
                      </Col>
                      <Col xs={2}>
                        {this.state.showComments === true ?
                          <Button
                            className='post-detail-comments-button'
                            onClick={() => this.setState({ showComments: false })}
                          >
                            <Glyphicon glyph='eye-close' /> Hide
                          </Button> :
                          <Button
                            className='post-detail-comments-button'
                            onClick={() => this.setState({ showComments: true })}
                          >
                            <Glyphicon glyph='eye-open' /> Show
                          </Button>
                        }
                      </Col>
                    </Row>
                    {comments && this.state.showComments &&
                      comments.filter(comment => comment.deleted === false)
                        .sort((a, b) => b.voteScore - a.voteScore)
                        .map(comment => (
                          <div key={comment.id}>
                            <hr />
                            <Row>
                              <Col xs={9}>
                                {comment.id === this.state.editing ?
                                  <div>
                                    <input
                                      type='text'
                                      style={{ color: 'black', width: '70%', marginRight: '1rem' }}
                                      value={this.state.temporaryBody || comment.body}
                                      onChange={(event) => this.handleCommentChange(event, comment.id)}
                                    />
                                    <Button
                                      type='submit'
                                      bsStyle='success'
                                      onClick={() => this.updateComment(comment)}
                                    >Submit</Button>
                                    <Button
                                      type='submit'
                                      bsStyle='warning'
                                      style={{ marginLeft: '1rem' }}
                                      onClick={() => this.cancelUpdateComment(comment.id)}
                                    >Cancel</Button>
                                  </div> :
                                  <p className='post-detail-comment'>{comment.body}</p>
                                }
                                <Row>
                                  <Col xs={3}>
                                    <p>
                                      <span>{comment.voteScore} </span>
                                      <span><Glyphicon
                                          glyph='plus'
                                          style={{ color: 'green' }}
                                          className={comment.hasVoted ? 'disabled' : null}
                                          onClick={() => this.voteComment('up', comment.id, comment.hasVoted)}
                                        /> </span>
                                      <Glyphicon
                                        glyph='minus'
                                        className={comment.hasVoted ? 'disabled' : null}
                                        style={{ color: 'red' }}
                                        onClick={() => this.voteComment('down', comment.id, comment.hasVoted)}
                                      />
                                    </p>
                                  </Col>
                                  <Col xs={3}>
                                    <p className='post-detail-author'><Glyphicon glyph='user' /> {comment.author}</p>
                                  </Col>
                                  <Col xs={3}>
                                    <p className='post-detail-time'><Glyphicon glyph='time' /> {formatDate(comment.timestamp, true)}</p>
                                  </Col>
                                </Row>
                              </Col>
                              <Col xs={3}>
                                {comment.id !== this.state.editing &&
                                  <div>
                                    <Button
                                      style={{ float: 'right' }}
                                      bsStyle='primary'
                                      onClick={() => this.initializeEditComment(comment.id)}
                                    >Edit</Button>
                                    <Button
                                      style={{ float: 'left' }}
                                      bsStyle='danger'
                                      onClick={() => this.deleteComment(comment.id)}
                                    >Delete</Button>
                                  </div>
                                }
                              </Col>
                            </Row>
                          </div>
                        )
                    )}
                  </Col>
                </Row>
              </Col>
            </div>
          )
        }
      </Row>
    )
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts,
    comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //setPostComments: data => dispatch(setComments(data)),
    deletePost: data => dispatch(deletePost(data)),
    deletePostComment: data => dispatch(deleteComment(data)),
    editComment: data => dispatch(editComment(data)),
    addComment: data => dispatch(addComment(data)),
    upVoteComment: data => dispatch(upVoteComment(data)),
    downVoteComment: data => dispatch(downVoteComment(data)),
    fetchCommentsIfNeeded: data => dispatch(fetchCommentsIfNeeded(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
