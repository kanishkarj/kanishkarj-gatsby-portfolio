import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

const IndexPage = ({data}) => (<div>
  <div className="row mt-5"></div>
  <section className="jumbotron text-center mt-4">
    <div className="container">
      <h1 className="jumbotron-heading">Album example</h1>
      <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
    </div>
  </section>
  <div className="container mt-5 mb-5">
    <form className="" action="https://formcarry.com/s/Sy_0bp44M" method="post">
      <div className="form-group">
        <input name="email" type="email" className="form-control square-border" aria-describedby="emailHelp" placeholder="Email"/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <input name="name" type="text" className="form-control square-border" aria-describedby="emailHelp" placeholder="Name"/>
      </div>
      <div className="form-group">
        <input name="subject" type="text" className="form-control square-border" aria-describedby="emailHelp" placeholder="Subject"/>
      </div>
      <div className="form-group">
          <textarea name="message" className="form-control" rows="12" placeholder="Message"></textarea>
      </div>
      <button type="submit" className="btn btn-primary square-border">Submit</button>
    </form>
  </div>
  <div className="row mt-5"></div>
  <div className="row mt-5"></div>
  <div className="row mt-5"></div>
</div>);

export default IndexPage;
