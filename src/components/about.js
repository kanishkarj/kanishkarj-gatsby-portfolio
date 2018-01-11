import React from 'react'
import Link from 'gatsby-link'

const AboutComponent = () => (<div className="mt-5 mb-3 font-rale">
  <article className="container row">
    <div className="col-md-9">
      <h2 className="">
        <b>About</b>
      </h2>
      <hr/>
      <p>
        Aenean vulputate volutpat dui, id faucibus lorem tincidunt nec. Morbi blandit tellus felis, in lobortis orci vestibulum vitae. Vestibulum condimentum feugiat lorem ac aliquam. Aenean posuere tristique neque non faucibus. Mauris placerat est turpis, a tempor neque mattis ut. Donec tempus pharetra urna a vulputate. Nunc pellentesque lacus nibh, id ultricies magna imperdiet ut.
      </p>
      <p>
        Quisque sit amet tempor elit. Quisque vehicula eget elit ut elementum. Curabitur aliquet dui eget mattis facilisis. In magna sapien, mattis interdum turpis at, rutrum scelerisque magna. Donec eu est ligula. Sed scelerisque nisi ut scelerisque rhoncus. Donec laoreet ut elit sed sodales. Integer augue quam, ultricies eu blandit sit amet, pharetra at elit.
      </p>
    </div>
    <div className="col-md-3">
      <img className="rounded-circle img-thumbnail"
        src="https://avatars2.githubusercontent.com/u/22411349?s=460&v=4" alt=""/>
    </div>
  </article>
</div>)

export default AboutComponent
