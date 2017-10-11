import React, { Component } from 'react'
import { Row, Col, Glyphicon } from 'react-bootstrap'
import { votePost } from '../utils/api'

class Score extends Component {
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
  	)
  }
}

export default Score
