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
        Hi! I'm Kanishkar J, a Software developer from India. Currently am pursuing my Undergraduate studies from IIT Indore. 
        My work mainly has been on Web technologies. I have experience with a wide range of technology stacks, and am willing to explore more !
      </p>
    </div>
    <div className="col-md-3">
      <img className="rounded-circle img-thumbnail"
        src="https://avatars2.githubusercontent.com/u/22411349?s=460&v=4" alt=""/>
    </div>
  </article>
</div>)

export default AboutComponent
