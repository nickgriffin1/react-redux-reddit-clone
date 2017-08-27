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
  render() {
    return (
      <Grid>
        <Row className='post-container'>
          <Col sm={3} lg={3} className='list-view-sort'>
            <h3>Sort by: </h3>
          </Col>
          <Col sm={3} lg={3}>
            <Button className='list-view-sort-button'>Points</Button>
          </Col>
          <Col sm={3} lg={3}>
            <Button className='list-view-sort-button'>Time</Button>
          </Col>
        </Row>
        {this.state.posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            body={post.body}
            category={post.category}
            score={post.voteScore}
            timestamp={post.timestamp}
          />
        ))}
      </Grid>
    );
  }
}

export default ListView
