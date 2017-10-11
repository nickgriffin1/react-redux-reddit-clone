import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, ControlLabel, Button, Row, Col, DropdownButton, MenuItem } from 'react-bootstrap'
import { addPost } from '../actions'

class AddView extends Component {
  state = {
    activity: this.props.activity || 'adding',
    categories: ['React', 'Redux', 'Udacity'],
    title: this.props.title || '',
    body: this.props.body || '',
    author: this.props.author || '',
    category: this.props.category || ''
  }

  handleSubmit = (event) => {
    // stop default serialization
    event.preventDefault()

    // dispatch addPost if all posts are populated
    const { title, body, author, category, time } = this.state
    if (title !== undefined && body !== undefined && author !== undefined && category !== undefined) {
      // set the time and id in state and call action and change route in callback
      this.setState({
        time: Date.now(),
        postId: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
      }, () => {
        this.props.addPost({ postId: this.state.postId, title, body, author, category, time })
        this.props.history.push('/posts/' + this.state.postId)
      })
    }
  }

  handleSetTitle = (event) => {
    this.setState({ title: event.target.value })
  }

  handleSetBody = (event) => {
    this.setState({ body: event.target.value })
  }

  handleSetAuthor = (event) => {
    this.setState({ author: event.target.value })
  }

  handleSelectCategory = (event) => {
    this.setState({ category: event })
  }

  render() {
    return (
      <Row>
        <Col sm={12} lg={8} lgOffset={2}>
          <div className='add-view-container'>
            <h1>Add/Edit a post</h1>
            <Form>
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type='text'
                  className='add-form-text-box'
                  onChange={this.handleSetTitle}
                  value={this.state.title}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Body</ControlLabel>
                <FormControl
                  type='text'
                  className='add-form-text-box'
                  onChange={this.handleSetBody}
                  value={this.state.body}
                />
              </FormGroup>

              {/* Yes I know author should be automatic but I don't have time for that*/}
              <FormGroup>
                <ControlLabel>Author</ControlLabel>
                <FormControl
                  type='text'
                  className='add-form-text-box'
                  onChange={this.handleSetAuthor}
                  value={this.state.author}
                />
              </FormGroup>

              <div className='add-form-bottom'>
                <FormGroup>
                  <DropdownButton
                    className='add-form-select-button'
                    title={this.state.category || 'Category'}
                    id='categoryDropdown'
                    value={this.state.category}
                    onSelect={this.handleSelectCategory}
                  >
                    <MenuItem disabled>Category</MenuItem>
                    <MenuItem divider />
                    {this.state.categories.map((category, index) => (
                      <MenuItem key={category} eventKey={category}>{category}</MenuItem>
                    ))}
                  </DropdownButton>
                </FormGroup>

                <Button
                  className='add-form-submit'
                  onClick={(e) => this.handleSubmit(e)}
                  type='submit'
                >Submit</Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: (post) => dispatch(addPost(post)),
})

export default connect(
  null,
  mapDispatchToProps
)(AddView)
