import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import Score from './Score'
import {
  deleteComment,
} from '../actions'
import { getPost, getPostComments } from '../utils/api'
import { capitalize, formatDate } from '../utils/shared'

class PostDetail extends React.Component {
  state = {
    numComments: 0,
    showComments: true,
    commenting: false
  }

  componentDidMount() {
    Promise.resolve(getPost(this.props.postId)).then((post) => {
      this.setState({
        title: post.title,
        body: post.body,
        author: post.author,
        category: capitalize(post.category),
        date: post.timestamp,
        score: post.voteScore
      })
    })

    Promise.resolve(getPostComments(this.props.postId)).then((comments) => {
      console.log('comments', comments)
      const commentsLen = comments.filter((comment) => comments.deleted === false).length
      this.setState({
        comments,
        numComments: comments.length
      })
    })
  }

  submitNewComment = () => {
    const newComment = {
      id: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
      parentId: this.props.postId,
      timestamp: Date.now(),
      body: this.state.newCommentBody,
      // users not yet implemented
      author: this.props.user || 'you',
      voteScore: 0,
      deleted: false
    }
    console.log(
      this.props
    )
    console.log(newComment)
    const comments = Object.assign([], this.state.comments)
    comments.push(newComment)
    this.setState((prevState) => ({
      comments,
      commenting: false,
      numComments: prevState.numComments + 1
    }))
    // dispatch ADD_COMMENT
  }

  cancelNewComment = () => {
    this.setState({ commenting: false })
  }

  updateCommentUtil = (commentId, selector, newValue, finished) => {
    // create new object so that original isn't directly edited
    const newComments = Object.assign([], this.state.comments)
    // divide the comment to edit from all other comments
    const updatedComments = newComments.filter((comment) => commentId === comment.id)
    const otherComments = newComments.filter((comment) => commentId !== comment.id)
    // edit the property
    updatedComments[0][selector] = newValue
    // set to finished if needed
    if (finished) {
      updatedComments[0].editing = false
    }
    // add all other comments
    updatedComments.push(...otherComments)
    // of course update state
    this.setState({ comments: updatedComments })
  }

  deleteComment = (commentId) => {
    this.updateCommentUtil(commentId, 'deleted', true, true)
    // also need to update comment amount
    this.setState((prevState) => ({
      numComments: prevState.numComments - 1
    }))
    console.log('this.props', this.props)
    this.props.deleteComment({ commentId })
  }

  initializeEditComment = (commentId) => {
    this.updateCommentUtil(commentId, 'editing', true)
  }

  updateComment = (commentId, newValue) => {
    this.updateCommentUtil(commentId, 'body', newValue, true)
    // TODO dispatch EDIT_COMMENT
  }

  cancelUpdateComment = (commentId) => {
    this.updateCommentUtil(commentId, null, null, true)
  }

  handleCommentChange = (event, commentId) => {
    this.updateCommentUtil(commentId, 'temporaryBody', event.target.value)
  }

  voteComment = (type, commentId, score, hasVoted) => {
    if (!hasVoted) {
      var newScore
      if (type === 'up') {
        newScore = score + 1
      } else if (type === 'down') {
        newScore = score - 1
      }
      this.updateCommentUtil(commentId, 'voteScore', newScore)
      this.updateCommentUtil(commentId, 'hasVoted', true)
      // TODO dispatch VOTE_COMMENT
    }
  }

  render() {
    return (
      <Row>
        <Col xs={12} lg={10} lgOffset={1} className='post-detail'>
          <Row>
            <Col xs={1}>
              <Score score={this.state.score || 0} />
            </Col>
            <Col xs={11}>
              <Row>
                <Col xs={9}>
                  <h3 className='post-detail-title'>{this.state.title}</h3>
                </Col>
                <Col xs={2}>
                  <Link to={'/posts/' + this.props.postId + '/edit/'}>
                    <Button style={{ float: 'right'}}>
                      <h5>
                        <Glyphicon glyph='pencil' /> Edit
                      </h5>
                    </Button>
                  </Link>
                </Col>
              </Row>
              <h4 className='post-detail-body'>{this.state.body}</h4>
              <h4 className='post-detail-author'><Glyphicon glyph='user' /> {this.state.author}</h4>
              <h4 className='post-detail-category'><Glyphicon glyph='list' /> {this.state.category}</h4>
              <h4 className='post-detail-time'><Glyphicon glyph='time' /> {formatDate(this.state.date, true)}</h4>
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={10} lgOffset={1} className='post-comments'>
          <Row>
            <Col xs={10} xsOffset={1}>
              {this.state.commenting === true ?
                <Row>
                  <Col xs={10}>
                    <input
                      type='text'
                      style={{ width: '100%', color: 'black' }}
                      onChange={(event) => this.setState({ newCommentBody: event.target.value })}
                    />
                  </Col>
                  <Col xs={2}>
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
                  <h4>{this.state.numComments} comments</h4>
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
              {this.state.comments && this.state.showComments && this.state.comments
                .filter((comment) => comment.deleted === false)
                .map((comment, index) => (
                  <div key={comment.id}>
                    <hr />
                    <Row>
                      <Col xs={10}>
                        {comment.editing === true ?
                          <div>
                            <input
                              type='text'
                              style={{ color: 'black', width: '70%', marginRight: '1rem' }}
                              value={comment.temporaryBody || comment.body}
                              onChange={(event) => this.handleCommentChange(event, comment.id)}
                            />
                            <Button
                              type='submit'
                              bsStyle='success'
                              onClick={() => this.updateComment(comment.id, comment.temporaryBody)}
                            >Submit</Button>
                            <Button
                              type='submit'
                              bsStyle='warning'
                              style={{ marginLeft: '1rem' }}
                              onClick={() => this.cancelUpdateComment(comment.id)}
                            >Cancel</Button>
                          </div>:
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
                                  onClick={() => this.voteComment('up', comment.id, comment.voteScore, comment.hasVoted)}
                                /> </span>
                              <Glyphicon
                                glyph='minus'
                                className={comment.hasVoted ? 'disabled' : null}
                                style={{ color: 'red' }}
                                onClick={() => this.voteComment('down', comment.id, comment.voteScore, comment.hasVoted)}
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
                      <Col xs={2}>
                        {comment.editing ?
                          <Button
                            style={{ float: 'left' }}
                            bsStyle='danger'
                            onClick={() => this.deleteComment(comment.id)}
                          >Delete</Button> :
                          <Button
                            style={{ float: 'right' }}
                            bsStyle='primary'
                            onClick={() => this.initializeEditComment(comment.id)}
                          >Edit</Button>
                        }
                      </Col>
                    </Row>
                  </div>
                )
              )}
            </Col>
          </Row>
        </Col>
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

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (data) => dispatch(deleteComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
