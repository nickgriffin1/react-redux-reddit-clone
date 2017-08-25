import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import { getPosts } from '../utils/api'
import Post from '../components/Post'

class ListView extends Component {
  componentDidMount() {
    console.log(getPosts())
  }
  render() {
    return (
      <Grid>
        <Post />
        <Post />
        <Post />
      </Grid>
    );
  }
}

export default ListView
