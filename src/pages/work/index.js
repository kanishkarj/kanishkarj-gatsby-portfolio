import React from 'react';
import Helmet from 'react-helmet';

const IndexPage = ({data}) => (
    <div>
      {data.allMarkdownRemark.edges.map( post => (
          <a href="">{post.node.frontmatter.title}</a>
        ))
      }
    </div>
  );

export const pageQuery = graphql`
  query WorkIndexQuery {
    allMarkdownRemark(
      limit: 10
      filter: { frontmatter: {layout : {eq : "work"}}}
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            subtitle
            date

            categories
          }
        }
      }
    }
  }
`

export default IndexPage;
