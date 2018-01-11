import React from 'react'
import Link from 'gatsby-link'

const BlogComponent = ({data}) => {
  return (<div className="container">
    <div className="row mt-5 mb-5">
  <div className="container">

      {
        data.map(post => {

          const postData = post.node.frontmatter;

          return (
            <div className="container">
              <div className="row">
              <Link className="row col-md-6 card card-link mb-2 mt-2 ml-0">
                <div className="container">
                  <div className="row p-0">
                    <div className="col-md-6 p-0">
                      <img src={postData.headerImg} className="img-fluid img" alt=""/>
                    </div>
                    <div className="card-body col-md-6">
                      <h4 className="card-title">{postData.title}</h4>
                      <h5 className="card-subtitle mb-2 text-muted">
                        <time>{postData.date}</time>
                      </h5>
                      <ul className="list-inline">
                        {
                          postData.categories.map((cat) => (<li className="list-inline-item">
                            <h5>
                              <span className="badge badge-secondary">{cat}</span>
                            </h5>
                          </li>))
                        }
                      </ul>
                      <p className="card-text">{postData.subtitle}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            </div>
        )
        })
      }
    </div>
      <div className="row mt-5"></div>
      <div className="row mt-5"></div>
    </div>

  </div>)
}

export default BlogComponent;
