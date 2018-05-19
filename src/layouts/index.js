import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import style from './index.scss'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBrands from '@fortawesome/fontawesome-free-brands'
import faSolid from '@fortawesome/fontawesome-free-solid'

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
            <a href={'mailto:'+meta.siteEmailUrl} target="_blank" className="nav-link footer-icon">
              <FontAwesomeIcon icon={faSolid.faEnvelope} />
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteGithubUrl} target="_blank" className="nav-link footer-icon">
            <FontAwesomeIcon icon={faBrands.faGithub} />
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteLinkedInUrl} target="_blank" className="nav-link footer-icon">
              <FontAwesomeIcon icon={faBrands.faLinkedinIn} />
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteTwitterUrl} target="_blank" className="nav-link footer-icon">
            <FontAwesomeIcon icon={faBrands.faTwitter} />
            </a>
          </li>
          <li className='nav-item'>
            <a href={meta.siteMediumUrl} target="_blank" className="nav-link footer-icon">
            <FontAwesomeIcon icon={faBrands.faMediumM} />
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

    <script src="https://use.fontawesome.com/5ee9b89447.js"></script>

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
