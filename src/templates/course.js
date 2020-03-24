import React from "react"
import { graphql } from "gatsby"

const Course = props => {
  const {
    data: {
      wpgraphql: { course },
    },
  } = props

  const { title } = course
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  )
}

export default Course
export const pageQuery = graphql`
  query GET_COURSE($id: ID!) {
    wpgraphql {
      course(id: $id) {
        uri
        title
        slug
        content
        featuredImage {
          sourceUrl
        }
        courseFields {
          careerOpportunities
          departmentHead
          label
          totalUnits
        }
      }
    }
  }
`
