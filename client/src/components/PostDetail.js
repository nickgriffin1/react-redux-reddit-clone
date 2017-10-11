import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'
import Score from './Score'

class PostDetail extends React.Component {
  state = {
    numComments: 0,
  }

  render() {
    return (
      <Row>
        <Col xs={12} lg={8} lgOffset={2} className='post-detail'>
          <Row>
            <Col xs={1}>
              <Score score={this.props.score || 0} />
            </Col>
            <Col xs={9}>
              <h2>Post Header</h2>
              <h4>Post Details</h4>
              <h4>Post Author</h4>
              <h4>Post Category</h4>
              <h4>Post Date</h4>
            </Col>
            <Col xs={2}>
              <Link to={'edit/' + ''}>
                <Button>
                  <h5>
                    <Glyphicon glyph="pencil" /> Edit
                  </h5>
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={8} lgOffset={2} className='post-comments'>
          <Row>
            <Col xs={10} xsOffset={1}>
              <h4>{this.state.numComments} comments</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default PostDetail
