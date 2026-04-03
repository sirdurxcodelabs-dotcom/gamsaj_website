import { Link } from 'react-router-dom'
import { useTeam } from '../../../hooks/useTeam'

const TeamFour = () => {
  const { members, loading } = useTeam()

  return (
    <div className="team-page space-top space-extra-bottom team-page-team-card">
      <div className="container">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-5 text-muted">No team members found.</div>
        ) : (
          <div className="row gy-30 justify-content-center">
            {members.map((member) => (
              <div key={member._id} className="col-lg-4 col-md-6">
                <div
                  className="team-card background-image"
                  style={{ backgroundImage: "url('/assets/img/bg/team-card-bg1-1.png')" }}
                >
                  <div className="team-card_content max-width-reset-team">
                    <h4 className="team-card_title">
                      <Link to="/team">{member.name}</Link>
                    </h4>
                    <span className="team-card_desig">{member.designation}</span>
                    <div className="team-social_wrap">
                      <div className="social-btn">
                        {member.facebook && (
                          <Link to={member.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="ri-facebook-fill" />
                          </Link>
                        )}
                        {member.twitter && (
                          <Link to={member.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="ri-twitter-x-line" />
                          </Link>
                        )}
                        {member.instagram && (
                          <Link to={member.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="ri-instagram-line" />
                          </Link>
                        )}
                        {member.linkedin && (
                          <Link to={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="ri-linkedin-fill" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="team-card_img team-card-white-space-none">
                    <img
                      src={member.photo || '/assets/img/team/team-1-1.png'}
                      alt={member.name}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  {member.phone && (
                    <Link to={`tel:${member.phone.replace(/\s/g, '')}`} className="contact-btn-wrap">
                      <span className="number">{member.phone}</span>
                      <div className="icon-btn"><i className="ri-phone-fill" /></div>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamFour
