import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import { getCategories } from '../utils/api'

class CategoryView extends Component {
  state = {
    categories: []
  }
  componentDidMount() {
    Promise.resolve(getCategories()).then((categories) => {
      this.setState({ ...categories })
    })
  }
  render() {
    console.log(this.state.categories)
    return (
      <Grid>
        {this.state.categories.map((category, index) => (
          <Row>
            <Col className='category-row' sm={12} lg={12}>
              <Link to={'/category/' + category.path}>
                <h3 className='category-text'><Glyphicon glyph="list" /> { category.name }</h3>
              </Link>
            </Col>
          </Row>
        ))}
      </Grid>
    );
  }
}

export default CategoryView
