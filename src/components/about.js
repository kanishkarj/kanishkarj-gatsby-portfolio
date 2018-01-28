import React from 'react'
import Link from 'gatsby-link'

const AboutComponent = () => (<div className="mt-5 mb-3 font-rale">
  <article className="container row">
    <div className="col-md-9">
      <h2 className="">
        <b>About</b>
      </h2>
      <hr/>
      <p className="home-about"> 
        Hi! I'm Kanishkar J, a Computer Science and Engineering undergraduate student studying at Indian Institute of Technology Indore.  I am an enthusiastic full-stack software developer and have worked with a wide range of technologies. My work has mostly been focused on Full-stack web application development.
      </p>
    </div>
    <div className="col-md-3">
      <img className="rounded-circle img-thumbnail"
        src="https://avatars2.githubusercontent.com/u/22411349?s=460&v=4" alt=""/>
    </div>
  </article>
</div>)

export default AboutComponent
