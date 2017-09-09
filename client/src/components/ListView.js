import React, { Component } from 'react'
import { Grid, Col, Row, Button } from 'react-bootstrap'
import { getPosts } from '../utils/api'
import Post from '../components/Post'

class ListView extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    Promise.resolve(getPosts()).then((posts) => {
      this.setState({ posts })
    })
  }
  formatDate = (ts) => {
    const date = new Date(ts)
    return  date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
  }
  filterPosts = (sorter) => {
    if (sorter === 'top') {
      console.log('sorting by points')
      this.setState((prevState) => {
        return { posts: prevState.posts.sort((post) => { return post.voteScore }).reverse() }
      })
    } else if (sorter === 'date') {
      console.log('sorting by date')
      this.setState((prevState) => {
        return { posts: prevState.posts.sort((a, b) => { return b.timestamp - a.timestamp }) }
      })
    }
  }
  render() {
    return (
      <Grid>
        <Row className='post-container'>
          <Col sm={3} lg={3} className='list-view-sort'>
            <h3>Sort by: </h3>
          </Col>
          <Col sm={3} lg={3}>
            <Button
              className='list-view-sort-button'
              onClick={() => this.filterPosts('top')}
            >Top</Button>
          </Col>
          <Col sm={3} lg={3}>
            <Button
              className='list-view-sort-button'
              onClick={() => this.filterPosts('date')}
            >Recent</Button>
          </Col>
        </Row>
        {this.state.posts.map((post) => (
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

export default ListView
