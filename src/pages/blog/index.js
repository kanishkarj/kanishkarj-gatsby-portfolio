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
  query IndexQuery {
    allMarkdownRemark(limit: 10) {
      edges {
        node {
          frontmatter {
            path
            title
            subtitle
            date
            layout
            categories
          }
        }
      }
    }
  }
`

export default IndexPage;
