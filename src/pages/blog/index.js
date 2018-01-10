import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';


const IndexPage = ({data}) => (<div className="container">
  <div className="row mt-5"></div>
  <div className="row mt-5"></div>
  <div className="row mt-5"></div>
  <div className="row mt-5 mb-5">
    {
      data.allMarkdownRemark.edges.map(post => (<div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{post.node.frontmatter.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted"><time>{post.node.frontmatter.date}</time></h6>
            <ul className="list-inline">
              {post.node.frontmatter.categories.map((cat) => (
              <li className="list-inline-item">
              <h6><span className="badge badge-secondary">{cat}</span></h6>
            </li>
            ))}
          </ul>
            <p className="card-text">{post.node.frontmatter.subtitle}</p>
            <Link to={post.node.frontmatter.path.toString()} className="card-link">Read more..</Link>
          </div>
        </div>
      </div>))
    }
    </div>
</div>);

export const pageQuery = graphql `
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
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
          }
        }
      }
    }
  }
`

export default IndexPage;
