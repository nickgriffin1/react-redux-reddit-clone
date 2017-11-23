import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Glyphicon, Button } from 'react-bootstrap'
import Score from './Score'

const Post = function(props) {
  return (
    <Row className='post-container'>
      <Col xs={1} md={1} lg={1}>
        <Score postId={props.id} />
      </Col>
      <Col xs={8} md={8} lg={8}>
        <Link to={props.category + '/' + props.id}>
          <h4 className='post-title'>{props.title}</h4>
        </Link>
        <p className='post-body'>{props.body}</p>
        <Row>
          <Col xs={4}>
            <p className='post-author'>
              <Glyphicon glyph="user" /> {props.author}
            </p>
          </Col>
          <Col xs={4}>
            <p>{props.numComments} Comments</p>
          </Col>
          <Col xs={2}>
            <Link to={props.category + '/' + props.id + '/edit'}>
              <Button bsStyle='primary'>Edit</Button>
            </Link>
          </Col>
          <Col xs={2}>
            <Button bsStyle='danger' onClick={() => props.onDeletePost()}>Delete</Button>
          </Col>
        </Row>
      </Col>
      <Col xs={3} md={3} lg={3}>
        <Row>
          <Col xs={12} lg={12}>
            <h4 className='post-category'>{props.category}</h4>
          </Col>
          <Col xs={12} lg={12}>
            <p className='post-timestamp'>{props.date}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Post
