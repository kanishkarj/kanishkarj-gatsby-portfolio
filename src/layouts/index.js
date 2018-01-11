import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import style from './index.scss'



const Header = () => (
  <div>
    <nav  className="navbar navbar-expand navbar-dark fixed-top flex-column flex-md-row">
      <div className="ml-auto mr-auto" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mb-3 mt-3">
          <li className={'nav-item'}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className={'nav-item'}>
            <Link to="/work/" className="nav-link">
              Work
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
    <div className="mb-5" />
  </div>
)

const CustFooter = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-xl fixed-bottom navbar-expand navbar-dark flex-column flex-md-row">
        <div className="mr-auto ml-auto">
          <ul className="navbar-nav">
            <li className='nav-item'>
                <a href="https://www.gatsbyjs.org/" target="_blank" className="nav-link">
                  <small>powered by @GatsbyJS</small>
                </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

const TemplateWrapper = ({children}) => (<div>
  <Helmet title="Gatsby Default Starter" meta={[
      {
        name: 'description',
        content: 'Sample'
      }, {
        name: 'keywords',
        content: 'sample, something'
      }
    ]}/>
  <Header/>


  <div>
    {children()}
  </div>

  <CustFooter/>
</div>)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
