import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

class PostDetail extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12} lg={12}>
          <Button className='post-edit-button'>
            <Glyphicon glyph="pencil" /> Edit
          </Button>
        </Col>
      </Row>
    )
  }
}

export default PostDetail
