import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import Score from './Score'
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
      this.setState({
        comments,
        numComments: comments.length
      })
    })
  }

  handleSubmitComment = () => {
    console.log(this.state.newComment)
  }

  render() {
    console.log('this.state.comments', this.state.comments)
    return (
      <Row>
        <Col xs={12} lg={10} lgOffset={1} className='post-detail'>
          <Row>
            <Col xs={1}>
              <Score score={this.state.score || 0} />
            </Col>
            <Col xs={11}>
              <Row>
                <Col xs={10}>
                  <h3 className='post-detail-title'>{this.state.title}</h3>
                </Col>
                <Col xs={2}>
                  <Link to={'/posts/' + this.props.postId + '/edit/'}>
                    <Button>
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
              <h4 className='post-detail-time'><Glyphicon glyph='time' /> {formatDate(this.state.date)}</h4>
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={10} lgOffset={1} className='post-comments'>
          <Row>
            <Col xs={10} xsOffset={1}>
              {this.state.commenting === true ?
                <Row>
                  <Col xs={10}>
                    <input type="text" value={this.state.newComment} style={{ width: '100%'}}/>
                  </Col>
                  <Col xs={2}>
                    <Button onClick={this.handleSubmitComment}>Submit</Button>
                  </Col>
                </Row>:
                <Button onClick={() => this.setState({ commenting: true })}>
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
              {this.state.comments && this.state.showComments && this.state.comments.map((comment, index) => (
                <div key={index}>
                  <hr />
                  <p className='post-detail-comment'>{comment.body}</p>
                  <p className='post-detail-author'><Glyphicon glyph='user' /> {comment.author}</p>
                </div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default PostDetail
