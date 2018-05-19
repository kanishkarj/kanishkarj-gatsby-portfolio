import React from 'react'
import Link from 'gatsby-link'

const AboutComponent = () => (<div className="mt-5 mb-3 font-rale">
  <article className="container row">
    <div className="col-md-9">
      <h2 className="">
        <b>Kanishkar J</b>
      </h2>
      <h6>
        <i>Linux and Open Source Fanatic</i>
      </h6>
      <hr/>
      <p className="home-about"> 
      Hi! I'm Kanishkar J, a Software developer from India. Currently, am pursuing my Undergraduate studies in Computer science from IIT Indore. My work mainly has been on Full stack development, web and desktop. My repertoire consists of a wide range of tools and libraries. To know more have a look at my resume and projects!
      </p>
    </div>
    <div className="col-md-3">
      <img className="rounded-circle img-thumbnail"
        src="https://avatars2.githubusercontent.com/u/22411349?s=460&v=4" alt=""/>
    </div>
  </article>
</div>)

export default AboutComponent
