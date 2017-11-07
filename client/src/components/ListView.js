import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Col, Row, Button } from 'react-bootstrap'
import { setPosts } from '../actions'
import { getPosts } from '../utils/api'
import Post from '../components/Post'
import { capitalize, formatDate } from '../utils/shared'

class ListView extends Component {
  state = {
    filteredPosts: []
  }

  componentDidMount() {
    // intialize posts
    if (this.props.posts.length === 0) {
      // set posts from API
      this.setPosts()
    } else {
      // set posts from props and filter as needed
      this.setFilteredPosts(this.props.posts)
    }
  }

  componentDidUpdate(prevProps) {
    // reset filtered posts when on main page
    if(this.props.router.location.pathname === '/' && prevProps.router.location.pathname !== '/') {
      this.setState({ filteredPosts: this.props.posts })
    }
  }

  setFilteredPosts = (posts) => {
    this.setState({ filteredPosts: this.props.posts })
    if (this.props.filter !== undefined) {
      this.filterPosts('category', this.props.filter)
    }
  }

  setPosts = () => {
    Promise
      .resolve(getPosts()).then((posts) => {
        this.props.setPosts({ posts })
        this.setFilteredPosts(posts)
      })
  }

  filterPosts = (sorter, category) => {
    if (sorter === 'top') {
      console.log('sorting by points')
      this.setState((prevState) => {
        return { filteredPosts: prevState.filteredPosts.sort((post) => { return post.voteScore }).reverse() }
      })
    } else if (sorter === 'date') {
      console.log('sorting by date')
      this.setState((prevState) => {
        return { filteredPosts: prevState.filteredPosts.sort((a, b) => { return b.timestamp - a.timestamp }) }
      })
    } else if (sorter === 'category') {
      console.log('sorting by category')
      this.setState({
        filteredPosts: this.props.posts.filter((post) => { return post.category === category})
      })
    } else {
      this.setState({ filteredPosts: this.props.posts })
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
            />
        ))}
      </Grid>
    );
  }
}

function mapStateToProps ({ router, posts }) {
  return {
    router,
    posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPosts: (data) => dispatch(setPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView)
