import React from 'react'
import Link from 'gatsby-link'

import AboutComponent from '../components/about'
import BlogComponent from '../components/blog'

const IndexPage = ({data}) => {
  
return(
  <div>
    <div className="header-image-container"/>
    <div className="container mb-5">
      <AboutComponent/>
      <BlogComponent data={data.allMarkdownRemark.edges} />
    </div>
  </div>
)
}

export default IndexPage
