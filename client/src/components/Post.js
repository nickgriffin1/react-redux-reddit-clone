import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

class Post extends Component {
  render() {
    return (
      <Grid>
        <Row className='post-container'>
          <Col sm={1} md={1} lg={1}>
            <h3 className='post-score'>12</h3>
          </Col>
          <Col sm={9} md={9} lg={9}>
            <h3 className='post-title'>Title</h3>
            <p className='post-author'>Author</p>
          </Col>
          <Col sm={2} md={2} lg={2}>
            <h4 className='post-category'>Category</h4>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Post
