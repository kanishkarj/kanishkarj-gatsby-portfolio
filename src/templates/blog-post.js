import React from 'react';
import Helmet from 'react-helmet';

export default function Template({data}) {
  const {markdownRemark: post} = data;
  return (<div>
    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
    <div className="container">
      <h1 className="text-center">{post.frontmatter.title}</h1>
      <h6 className="text-center text-muted">{post.frontmatter.subtitle}</h6>
      <br/>
      <h5 className="ml-3 text-muted">{post.frontmatter.date}</h5>
      <br/>
      <div>
        <div dangerouslySetInnerHTML={{
            __html: post.html
          }}></div>
      </div>
      <hr className="row mt-3"/>
    </div>

    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
  </div>);
}

export const postQuery = graphql `
  query BlogPostByPath($path: String!){
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
    markdownRemark(frontmatter: { path : { eq : $path } } ) {
      id
      html
      frontmatter{
        path
        title
        subtitle
        date
      }
    }
  }
`
