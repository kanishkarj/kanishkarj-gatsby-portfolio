import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

const IndexPage = ({data}) => (<div>
  <div className="row mt-5"></div>
  <section className="jumbotron text-center mt-4">
    <div className="container">
      <h1 className="jumbotron-heading blog-heading">Codenizant</h1>
    </div>
  </section>
  <div className="container">
    <div className="row mt-5 mb-5 row-eq-height">
      {
        data.allMarkdownRemark.edges.map(post => (
          <div className="col-md-4 mt-2 mb-2">
          <Link className="card card-link mt-2 mb-2 full-height" to={post.node.frontmatter.path}>
            <img className="card-img-top" src={post.node.frontmatter.headerImg} alt=""/>
            <div className="card-body">
              <h5 className="card-title">{post.node.frontmatter.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                <time>{post.node.frontmatter.date}</time>
              </h6>
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

export const pageQuery = graphql `
  query IndexQuery {
    allMarkdownRemark(
      limit: 100
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

export default IndexPage;
