import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ReactComponent as ConnectionSVG } from '../../img/undraw_connection_b38q.svg'


const Landing = ({ isAuthenticated }) => {
   if (isAuthenticated) {
      return <Redirect to='/dashboard' />
   }

   return (
      <section className="landing">
         <div className="landing-illustration">
            <ConnectionSVG />
         </div>
         <div className="landing-content">
            <h1 className="x-large">Devlopers Station</h1>
            <p className="lead">
               Create a developer profile/portfolio, share posts and get help from
               other developers
            </p>
            <div className="buttons">
               <Link to="/register" className="btn  btn-primary">Sign Up</Link>
               <Link to="/login" className="btn btn-secondary btn-light">Login</Link>
            </div>
         </div>
      </section>
   )
}

Landing.propTypes = {
   isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
