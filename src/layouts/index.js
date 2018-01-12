import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import style from './index.scss'

const Header = () => (<div>
  <nav className="navbar navbar-expand navbar-dark fixed-top flex-column flex-md-row">
    <div className="ml-auto mr-auto" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-3 mt-3">
        <li className={'nav-item'}>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className={'nav-item'}>
          <Link to="/projects/" className="nav-link">
            Projects
          </Link>
        </li>
        <li className={'nav-item'}>
          <Link to="/blog/" className="nav-link">
            Blog
          </Link>
        </li>
        <li className={'nav-item'}>
          <Link to="/contact/" className="nav-link">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  <div className="mb-5"/>
</div>)

const CustFooter = (data) => {
  const meta = data.data
  return (<div>
    <nav className="navbar navbar-toggleable-xl fixed-bottom navbar-expand navbar-dark flex-column flex-md-row">
      <div className="mr-auto ml-auto">
        <ul className="navbar-nav">
          <li className='nav-item'>
            <a href={meta.siteEmailUrl} target="_blank" className="nav-link">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteGithubUrl} target="_blank" className="nav-link">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteLinkedInUrl} target="_blank" className="nav-link">
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteTwitterUrl} target="_blank" className="nav-link">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteGitconnectedUrl} target="_blank" className="nav-link">
              <i className="fa fa-git" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>);
}

const TemplateWrapper = ({children,data}) => {
  let meta = data.site.meta;
  return(<div>

  <Header/>

  <div>
    {children()}

  </div>

  <CustFooter data={meta}/>
</div>
)}

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export const postQuery = graphql `
  query MetaQuery{
    site {
      meta: siteMetadata {
        title
        siteDescr
        siteUrl
        siteAuthor
        siteTwitterUrl
        siteGithubUrl
        siteEmailUrl
        siteLinkedInUrl
        siteGitconnectedUrl
        }
    }
  }
`


export default TemplateWrapper
