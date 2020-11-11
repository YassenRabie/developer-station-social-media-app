import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const profileItem = ({ profile: { user: { _id, name, avatar }, status, company, location, skills } }) => {
   return (
      < div className="profile" >
         <img src={avatar} alt="avatar" className="round-img" />
         <div>
            <h2>{name}</h2>
            <p>{status} {company && <span> at {company}</span>}</p>
            <p className="my-1">{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">View profile </Link>
         </div>
         <ul>
            {skills.slice(0, 4).map((skill, index) => (
               <li key={index} className="text-primary skill">{skill}</li>
            ))}
         </ul>
      </div >
   )
}

profileItem.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default profileItem
