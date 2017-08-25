import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
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
        {this.state.posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            body={post.body}
            category={post.category}
            score={post.voteScore}
          />
        ))}
      </Grid>
    );
  }
}

export default ListView
