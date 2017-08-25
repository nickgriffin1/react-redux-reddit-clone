import React, { Component } from 'react'
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'

export default function Post({ score, title, body, author, category }) {
  return (
    <Grid>
      <Row className='post-container'>
        <Col sm={1} md={1} lg={1}>
          <h3 className='post-score'>{ score }</h3>
        </Col>
        <Col sm={9} md={9} lg={9}>
          <h4 className='post-title'>{ title }</h4>
          <p className='post-body'>{ body }</p>
          <p className='post-author'>
            <Glyphicon glyph="user" /> { author }
          </p>
        </Col>
        <Col sm={2} md={2} lg={2}>
          <h4 className='post-category'>{ category }</h4>
          <Button className='post-button'><Glyphicon glyph="pencil" /> Comments</Button>
        </Col>
      </Row>
    </Grid>
  );
}
