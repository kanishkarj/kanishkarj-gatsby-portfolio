import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

const IndexPage = ({ data }) => ( < div >
        <div className = "row mt-5" > < /div>
        <section className = "jumbotron text-center mt-4" >
        <div className = "container" >
        <h1 className = "jumbotron-heading blog-heading" > Codenizant </h1>
        </div>
      </section>
        <div className = "container" >
        <div className = "row mt-5 mb-5 row-eq-height" > {
            data.allMediumUser.edges[0].node.posts.map(post => {
                    let imgPath = `https://cdn-images-1.medium.com/max/800/${post.virtuals.previewImage.imageId}`
                    let url = `https://medium.com/@kanishkarj/${post.slug}-${post.id}`
                    return (
                      <div key = { post.id }
                        className = "col-md-4 mt-2 mb-2" >
                        <a target = 'blank'
                        className = "card card-link mt-2 mb-2 full-height"
                        href = { url } >
                        <img className = "card-img-top"
                        src = { imgPath }
                        alt = "" / >
                        <div className = "card-body" >
                        <h5 className = "card-title" > { post.title } </h5>
                        <h6 className = "card-subtitle mb-2 text-muted" >
                        <time > { post.firstPublishedAt } </time>
                        </h6>
                        <ul className = "list-inline" > {
                            post.virtuals.tags.map((cat) => ( < li className = "list-inline-item" >
                                    <h6 >
                                    <span className = "badge badge-secondary" > { cat.name } </span>
                                    </h6>
                                    </li>))
                                }
                        </ul>
                        <p className = "card-text" > { post.virtuals.subtitle } </p>
                        </div>
                          </a>
                        </div>
                            )
                        })
                }
                </div>
                <div className = "row mt-5" > </div>
                <div className = "row mt-5" > </div>
                <div className = "row mt-5" > </div>
                </div>
              </div>);

                export const pageQuery = graphql `
  query IndexQuery {
    allMediumUser {
          edges {
            node {
              name
              posts {
                title
                id
                slug
                firstPublishedAt
                virtuals {
                  subtitle
                  tags {
                    slug
                    name
                    postCount
                    type
                  }
                  readingTime

                  previewImage {
                    imageId
                  }
                }
              }
            }
          }
        }

  }
`

                export default IndexPage;
