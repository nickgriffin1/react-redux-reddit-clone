import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'

const CategoryView = function(props) {
  return (
    <Grid>
      <Row>
        <Col className='category-row' xs={12}>
          <h1 className='category-text'>View a Category</h1>
        </Col>
        {props.categories.map((category, index) => (
          <Col key={index} className='category-row' xs={12}>
            <Link to={category.path}>
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
  )
}

function mapStateToProps ({ categories }) {
  return {
    categories,
  }
}

export default connect(mapStateToProps)(CategoryView)
