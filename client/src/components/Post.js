import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import { votePost } from '../utils/api'

class Post extends React.Component {
  state = {
    score: this.props.score
  }

  changeScore = (changeInScore) => {
    // so each user only has one vote
    const newScore = this.state.score + changeInScore
    const maxScore = this.props.score + 1
    const minScore = this.props.score - 1
    // make sure score is in bounds
    if (newScore <= maxScore && newScore >= minScore) {
      // set local state for UI
      this.setState((prevState) => {
        return { score: prevState.score + changeInScore }
      })
      // call api to set votes
      const type = changeInScore === 1 ? 'upVote' : 'downVote'
      votePost(this.props.id, type)
    }
  }

  render() {
    return (
      <Row className='post-container'>
        <Col xs={1} md={1} lg={1}>
          <Row>
            <Col xs={12} onClick={() => this.changeScore(1)}>
              <Glyphicon className='post-arrow' glyph='menu-up' />
            </Col>

            <Col xs={12}>
              <h3 className='post-score'>{this.state.score}</h3>
            </Col>

            <Col xs={12} onClick={() => this.changeScore(-1)}>
              <Glyphicon className='post-arrow' glyph='menu-down' />
            </Col>
          </Row>
        </Col>
        <Col xs={8} md={8} lg={8}>
          <Link to={'/posts/' + this.props.id}>
            <h4 className='post-title'>{this.props.title}</h4>
          </Link>
          <p className='post-body'>{this.props.body}</p>
          <p className='post-author'>
            <Glyphicon glyph="user" /> {this.props.author}
          </p>
        </Col>
        <Col xs={3} md={3} lg={3}>
          <Row>
            <Col xs={12} lg={12}>
              <h4 className='post-category'>{this.props.category}</h4>
            </Col>
            <Col xs={12} lg={12}>
              <p className='post-timestamp'>{this.props.date}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Post
