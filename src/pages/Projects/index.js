import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

const IndexPage = ({data}) => (<div>
  <div className="row mt-5"></div>
  <section className="jumbotron text-center mt-4">
    <div className="container">
      <h1 className="jumbotron-heading">Album example</h1>
      <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
    </div>
  </section>
  <div className="container">
    <div className="row mt-5 mb-5 row-eq-height">
      {
        data.allMarkdownRemark.edges.map(post => (
          <div className="col-md-4 mt-2 mb-2">
          <Link className="card card-link mt-2 mb-2 full-height" to={post.node.frontmatter.path}>
            <div className="card-body">
              <h5 className="card-title">{post.node.frontmatter.title}</h5>

              <ul className="list-inline">
                {
                  post.node.frontmatter.categories.map((cat) => (<li className="list-inline-item">
                    <h6>
                      <span className="badge badge-secondary">{cat}</span>
                    </h6>
                  </li>))
                }
              </ul>
              <p className="card-text">{post.node.frontmatter.subtitle}</p>
            </div>
          </Link>
        </div>))
      }
    </div>
    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
  </div>
</div>);

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
