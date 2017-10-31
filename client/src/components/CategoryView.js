import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import { getCategories } from '../utils/api'
import { setCategories } from '../actions'

class CategoryView extends Component {
  state = {
    categories: []
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      Promise.resolve(getCategories()).then((categories) => {
        console.log('categories', categories)
        this.props.setCategories({ categories })
      })
    }
  }

  render() {
    return (
      <Grid>
      <Row>
        <Col className='category-row' xs={12}>
          <h1 className='category-text'>View a Category</h1>
        </Col>
        {this.props.categories.map((category, index) => (
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

function mapStateToProps ({ categories }) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (data) => dispatch(setCategories(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryView)
