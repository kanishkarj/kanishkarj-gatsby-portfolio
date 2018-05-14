import React from 'react';
import Helmet from 'react-helmet';

export default function Template({data}) {
  const meta = data.site.meta;
  const {markdownRemark: post} = data;
  return (<div>
    <Helmet title={meta.title} meta={[
        {
          name: 'twitter:card',
          content: 'summary'
        }, {
          name: 'twitter:site',
          content: meta.siteTwitterUrl
        }, {
          property: 'og:title',
          content: post.frontmatter.title
        }, {
          property: 'og:type',
          content: 'article'
        }, {
          property: 'og:description',
          content: post.frontmatter.subtitle
        }, {
          property: 'og:url',
          content: meta.siteUrl + post.frontmatter.path
        }
      ]}/>
    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
    <div className="row mt-5"></div>
    <div className="container">
      <h1 className="text-center">{post.frontmatter.title}</h1>
      <h6 className="text-center text-muted">{post.frontmatter.subtitle}</h6>
      <br/>
      <h5 className="ml-3 text-muted">{post.frontmatter.date}</h5>
      <br/>
      <img src={post.frontmatter.headerImg} className=" mb-5 img-fluid full-width" alt=""/>
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
    markdownRemark(
        frontmatter: { path : { eq : $path } }
      ) {
      id
      html
      frontmatter{
        path
        title
        subtitle
        headerImg
        date
      }
    }
  }
`
