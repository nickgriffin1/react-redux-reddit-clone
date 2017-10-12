import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import { getCategories } from '../utils/api'

class CategoryView extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    Promise.resolve(getCategories()).then((data) => {
      this.setState({ categories: data.categories })
    })
  }

  render() {
    return (
      <Grid>
      <Row>
        <Col className='category-row' xs={12}>
          <h1 className='category-text'>View a Category</h1>
        </Col>
        {this.state.categories.map((category, index) => (
          <Col key={index} className='category-row' xs={12}>
            <Link to={'/categories/' + category.path}>
              <Row>
                <h2 className='category-text'>
                  <Col xs={11}>
                    { category.name }
                  </Col>
                  <Col xs={1}>
                    <Glyphicon glyph='chevron-right' />
                  </Col>
                </h2>
              </Row>
            </Link>
          </Col>
        ))}
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
})

export default connect(mapStateToProps)(CategoryView)
