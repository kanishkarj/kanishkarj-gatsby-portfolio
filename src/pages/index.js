import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet';

import AboutComponent from '../components/about'
import BlogComponent from '../components/blog'
import ProjectComponent from '../components/project'

const IndexPage = ({data}) => {
  const meta = data.site.meta;
  
  return(
  <div>
    
    <Helmet title={meta.title} meta={[
        {
          name: 'twitter:card',
          content: 'summary'
        }, {
          name: 'twitter:site',
          content: meta.siteTwitterUrl
        }, {
          property: 'og:title',
          content: "post.frontmatter.title"
        }, {
          property: 'og:type',
          content: 'article'
        }, {
          property: 'og:description',
          content: "post.frontmatter.subtitle"
        }, {
          property: 'og:url',
          content: meta.siteUrl
        }
        , {
          property: 'og:author',
          content: meta.siteAuthor
        }
      ]}/>
    <div className="header-image-container"/>
    <div className="mb-5">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <AboutComponent/>
        </div>
      </div>
      <div className="container">
        <BlogComponent data={data.allMediumUser.edges[0].node.posts} />
      </div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <ProjectComponent data={data.work.edges} />
        </div>
      </div>
    </div>
  </div>
)
}

export const pageQuery = graphql `
  query IndexBlogQuery {
    site {
      meta: siteMetadata {
        title
        siteDescr
        siteUrl
        siteAuthor
        siteTwitterUrl
        siteGithubUrl
        siteEmailUrl
        siteGitconnectedUrl
        }
    }
      work : allMarkdownRemark(
        limit: 3
        filter: { frontmatter: {layout : {eq : "work"}}}
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
export default IndexPage
