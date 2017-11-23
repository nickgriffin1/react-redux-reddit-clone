import React from 'react'
import { Row, Col } from 'react-bootstrap'

const NotFoundView = function() {
  return (
    <Row>
      <Col xs={12} className='text-center'>
        <h1>404 Not Found</h1>
        <h1>¯\_(ツ)_/¯</h1>
      </Col>
    </Row>
  )
}

export default NotFoundView
