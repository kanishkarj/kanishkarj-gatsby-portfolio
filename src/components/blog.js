import React from 'react'
import Link from 'gatsby-link'

const BlogComponent = ({data}) => {
  return (<div className="container mt-5">
    <hr/>
    <h2 className="text-center">
      <b>BLOG</b>
    </h2>
    <hr/>
    <div className="row mt-5 mb-5">

      {
        data.map(post => {

          const postData = post.node.frontmatter;

          return (
            <div key={postData.id} className="col-md-4 mt-2 mb-2">
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
          </div>
        )
        })
      }
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
    </div>

  </div>)
}

export default BlogComponent;
