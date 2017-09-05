import React, { Component } from 'react'
import { FormGroup, FormControl, Button, Row, Col } from 'react-bootstrap'

class AddView extends Component {
  render() {
    return (
      <Row>
        <Col sm={12} lg={8} lgOffset={2}>
          <FormGroup>
            <FormControl type="text" placeholder="Title" />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    );
  }
}

export default AddView
