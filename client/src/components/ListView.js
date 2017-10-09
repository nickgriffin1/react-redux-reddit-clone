import React, { Component } from 'react'
import { Grid, Col, Row, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { getPosts } from '../utils/api'
import Post from '../components/Post'

class ListView extends Component {
  state = {
    posts: [],
    filteredPosts: []
  }

  componentDidMount() {
    // intialize posts
    this.setPosts()
  }

  componentDidUpdate(prevProps) {
    // reset filtered posts when on main page
    if(this.props.location.pathname === '/' && prevProps.location.pathname !== '/') {
      this.setState({ filteredPosts: this.state.posts })
    }
  }

  setPosts = () => {
    Promise.resolve(getPosts()).then((posts) => {
      this.setState({ posts, filteredPosts: posts })
      if (this.props.filter !== undefined) {
        this.filterPosts('category', this.props.filter)
      }
    })
  }

  formatDate = (ts) => {
    const date = new Date(ts)
    return  date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
  }

  capitalize = (word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1)
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
      this.setState((prevState) => {
        return { filteredPosts: prevState.posts.filter((post) => { return post.category === category})}
      })
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
            <Col xs={12}>
              <h1>{this.capitalize(this.props.filter)}</h1>
            </Col>
          </Row>
        }

        {this.state.filteredPosts && this.state.filteredPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            body={post.body}
            category={post.category}
            score={post.voteScore}
            date={this.formatDate(post.timestamp)}
          />
        ))}
      </Grid>
    );
  }
}

export default withRouter(ListView)
