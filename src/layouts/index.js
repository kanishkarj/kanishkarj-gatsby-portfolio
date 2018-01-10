import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import style from './index.scss'

const pathPrefix =
  process.env.NODE_ENV === 'development' ? '' : __PATH_PREFIX__

const Header = () => (
  <div>
    <nav className="navbar navbar-expand navbar-dark fixed-top flex-column flex-md-row bg-dark">
      <div className="ml-auto mr-auto" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mb-3 mt-3">
          <li className={'nav-item'}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className={'nav-item'}>
            <Link to="/" className="nav-link">
              Work
            </Link>
          </li>
          <li className={'nav-item'}>
            <Link to="/" className="nav-link">
              Blog
            </Link>
          </li>
          <li className={'nav-item'}>
            <Link to="/" className="nav-link">
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
      <nav className="navbar navbar-expand navbar-darkflex-column flex-md-row bg-dark">
        <a class="navbar-brand" href="#">
          <small>
            <b>kanishkarj.github.io</b>
          </small>
        </a>
        <div className="ml-auto" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto ">
            <li
              className={
                location.pathname === '/' ? 'nav-item active' : 'nav-item'
              }
              >
                <Link to="/" className="nav-link">
                <small>powered by github</small>
              </Link>
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

  <img
    className="img-fluid"
    src={pathPrefix + 'background.jpg'}
    alt=""
  />
  <div className={'container'}>
    {children()}
  </div>
  <CustFooter/>
</div>)

TemplateWrapper.propTypes = {
  children: PropTypes.func
}

export default TemplateWrapper
