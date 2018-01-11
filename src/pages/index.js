import React from 'react'
import Link from 'gatsby-link'

import AboutComponent from '../components/about'
import BlogComponent from '../components/blog'

const IndexPage = ({data}) => {

return(
  <div>
    <div className="header-image-container"/>
    <div className="mb-5">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <AboutComponent/>
        </div>
      </div>
      <div className="container">
        <BlogComponent data={data.allMarkdownRemark.edges} />
      </div>
    </div>
  </div>
)
}

export const pageQuery = graphql `
  query IndexBlogQuery {
    allMarkdownRemark(
      limit: 3
      filter: { frontmatter: {layout : {eq : "post"}}}
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            subtitle
            date
            layout
            categories
            headerImg
          }
        }
      }
    }
  }
`
export default IndexPage
