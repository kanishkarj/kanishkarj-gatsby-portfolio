import React from 'react'
import Link from 'gatsby-link'

import AboutComponent from '../components/about'
import BlogComponent from '../components/blog'

const IndexPage = () => (
  <div>
    <div className="header-image-container"/>
    <div className="container mb-5">
      <AboutComponent/>
      <BlogComponent/>
    </div>
  </div>
)

export default IndexPage
