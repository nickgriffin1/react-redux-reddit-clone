import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, ControlLabel, Button, Row, Col, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap'
import { addPost, setCategories } from '../actions'
import { getPost, getCategories } from '../utils/api'
import { capitalize } from '../utils/shared'

class AddView extends Component {
  state = {
    categories: [],
    title: '',
    body: '',
    author: '',
    category: '',
    done: false
  }

  componentDidMount() {
    // set categories if not already set
    if(this.props.categories.length === 0) {
      Promise.resolve(getCategories()).then((categories) => {
        this.props.setCategories({ categories })
      })
    }

    if (this.props.mode === 'editing') {
      Promise.resolve(getPost(this.props.postId)).then((post) => {
        this.setState({
          postId: post.id,
          title: post.title,
          body: post.body,
          author: post.author,
          category: capitalize(post.category),
        })
      })
    } else {
      this.setState({
        postId: '',
        title: '',
        body: '',
        author: '',
        category: '',
      })
    }
  }

  handleFormSubmit = (event) => {
    // stop default serialization
    event.preventDefault()

    // dispatch addPost if all posts are populated
    const { title, body, author, category, time } = this.state
    if (title.length > 0 && body.length > 0 && author.length > 0 && category.length > 0) {
      // set the time and id in state and call action and change route in callback
      this.setState({
        time: Date.now(),
        postId: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
      }, () => {
        this.props.addPost({ postId: this.state.postId, title, body, author, category, time })
        this.setState({ done: true })
      })
    } else {
      // TODO handle show error here
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

  deletePost = () => {
    // TODO not yet implemented
    console.log('fix me')
  }

  render() {
    return (
      <Row>
        <Col sm={12} lg={10} lgOffset={1}>
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

              {/* Yes I know author should be automatic but user functionality isn't implemented*/}
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
                    {this.props.categories.map((category, index) => (
                      <MenuItem key={category.name} eventKey={category.name}>{category.name}</MenuItem>
                    ))}
                  </DropdownButton>
                </FormGroup>

                {this.state.done === true ?
                  <Button bsStyle='success' className='add-form-submit'>
                    <Glyphicon glyph='ok' /> Finished
                  </Button> :
                  <Button
                    bsStyle='primary'
                    className='add-form-submit'
                    onClick={(e) => this.handleFormSubmit(e)}
                    type='submit'
                  >Submit</Button>
                }

                {this.props.mode === 'editing' &&
                  <Button bsStyle='danger' onClick={this.deletePost}>Delete</Button>
                }
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    setCategories: (data) => dispatch(setCategories(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddView)
