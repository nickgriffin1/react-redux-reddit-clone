import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button, Row, Col } from 'react-bootstrap'

class AddView extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ time: Date.now() }, () => {
      console.log('this.state', this.state)
    })
  }
  render() {
    return (
      <Row>
        <Col sm={12} lg={8} lgOffset={2}>
          <div className='add-view-container'>
            <h1>Add a new post</h1>
            <Form>
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type='text'
                  className='add-form-text-box'
                  onChange={(e) => this.setState({ title: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Body</ControlLabel>
                <FormControl
                  type='text'
                  className='add-form-text-box'
                  onChange={(e) => this.setState({ body: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Author</ControlLabel>
                <FormControl
                  type='text'
                  className='add-form-text-box'
                  onChange={(e) => this.setState({ author: e.target.value})}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Category</ControlLabel>
                <FormControl
                  type='text'
                  className='add-form-text-box'
                  onChange={(e) => this.setState({ category: e.target.value})}
                />
              </FormGroup>
              
              <Button
                onClick={(e) => this.handleSubmit(e)}
                type='submit'
              >Submit</Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default AddView
