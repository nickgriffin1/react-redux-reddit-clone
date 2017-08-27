import React, { Component } from 'react'
import Timestamp from 'react-timestamp'
import { Row, Col, Button, Glyphicon } from 'react-bootstrap'

export default function Post({ score, title, body, author, category, timestamp }) {
  return (
    <Row className='post-container'>
      <Col xs={1} md={1} lg={1}>
        <h3 className='post-score'>{ score }</h3>
      </Col>
      <Col xs={8} md={8} lg={8}>
        <h4 className='post-title'>{ title }</h4>
        <p className='post-body'>{ body }</p>
        <p className='post-author'>
          <Glyphicon glyph="user" /> { author }
        </p>
      </Col>
      <Col xs={3} md={3} lg={3}>
        <Row>
          <Col xs={12} lg={12}>
            <h4 className='post-category'>{ category }</h4>
          </Col>
          <Col xs={12} lg={12}>
            <p className='post-timestamp'><Glyphicon glyph="time" /> <Timestamp time={timestamp} /></p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
