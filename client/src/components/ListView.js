import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Col, Row, Button } from 'react-bootstrap'
import Post from '../components/Post'
import { deletePost, fetchCommentsIfNeeded } from '../actions'
import { capitalize, formatDate } from '../utils/shared'

class ListView extends Component {
  state = {
    filteredPosts: this.props.posts,
  }

  componentDidMount() {
    if(this.props.filter) {
      this.filterPosts('category', this.props.filter)
    }
  }

  componentDidUpdate(prevProps) {
    // reset filtered posts when on main page
    if(this.props.router.location.pathname === '/' && prevProps.router.location.pathname !== '/') {
      this.setState({ filteredPosts: this.props.posts })
    }
    // set posts once async call has finished
    if (prevProps.posts.length === 0 && this.props.posts.length > 0) {
      if(this.props.filter) {
        this.filterPosts('category', this.props.filter)
      } else {
        this.setState({ filteredPosts: this.props.posts })
      }
    }

    if (this.props.posts !== prevProps.posts) {
      if (this.props.posts.length > 0) {
        this.props.posts.forEach(post => {
          this.props.fetchCommentsIfNeeded(post.id)
        })
      }
    }
  }

  filterPosts = (sorter, category) => {
    if (sorter === 'top') {
      this.setState((prevState) => {
        return { filteredPosts: prevState.filteredPosts.sort((post) => { return post.voteScore }).reverse() }
      })
    } else if (sorter === 'date') {
      this.setState((prevState) => {
        return { filteredPosts: prevState.filteredPosts.sort((a, b) => { return b.timestamp - a.timestamp }) }
      })
    } else if (sorter === 'category') {
      this.setState({
        filteredPosts: this.props.posts.filter((post) => { return post.category === category})
      })
    } else {
      this.setState({ filteredPosts: this.props.posts })
    }
  }
  getNumComments = postId => {
    if (this.props.comments[postId]) {
      return this.props.comments[postId].length
    } else {
      return 0
    }
  }
  render() {
    return (
      <Grid>
        <Row className='post-container post-container-buttons'>
          <Col xs={11} xsOffset={1}>
            <Button
              className='list-view-sort-button'
              onClick={() => this.filterPosts('top')}
            >Top</Button>
            <Button
              className='list-view-sort-button'
              onClick={() => this.filterPosts('date')}
            >Recent</Button>
          </Col>
        </Row>

        {this.props.filter &&
          <Row className='post-container'>
            <Col xs={11} xsOffset={1}>
              <h1>{capitalize(this.props.filter)}</h1>
            </Col>
          </Row>
        }

        {this.state.filteredPosts && this.state.filteredPosts
          .filter(post => post.deleted === false)
          .map(post => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              author={post.author}
              body={post.body}
              category={post.category}
              score={post.voteScore}
              date={formatDate(post.timestamp)}
              numComments={this.getNumComments(post.id)}
              onDeletePost={() => this.props.deletePost({ postId: post.id })}
            />
        ))}
      </Grid>
    );
  }
}

function mapStateToProps({ router, posts, comments }) {
  return {
    router,
    posts,
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: data => dispatch(deletePost(data)),
    fetchCommentsIfNeeded: data => dispatch(fetchCommentsIfNeeded(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
