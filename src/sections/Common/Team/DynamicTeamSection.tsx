import { Link } from 'react-router-dom'
import { useTeam } from '../../../hooks/useTeam'

interface Props {
  limit?: number
  showViewAll?: boolean
  viewAllLink?: string
  title?: string
}

const DynamicTeamSection = ({
  limit,
  showViewAll = false,
  viewAllLink = '/team',
  title = 'Meet our leadership',
}: Props) => {
  const { members, loading } = useTeam(limit)

  if (loading) return null
  if (members.length === 0) return null

  return (
    <div className="team-area-1 space shape-mockup-wrap">
      <div
        className="section-animation-shape1-1 shape-mockup animation-infinite background-image"
        style={{ bottom: '0px', backgroundImage: "url('/assets/img/shape/global-line-shape2.png')" }}
      />
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-7 col-md-7">
            <div className="title-area text-left content-text-extra-style">
              <span className="sub-title">
                <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                Our Team
              </span>
              <h2 className="sec-title">{title}</h2>
            </div>
          </div>
          {showViewAll && (
            <div className="col-md-auto">
              <div className="sec-btn">
                <Link to={viewAllLink} className="btn">
                  View All Members <i className="ri-arrow-right-up-line" />
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="row gy-30 justify-content-center">
          {members.map((member) => (
            <div key={member._id} className="col-lg-4 col-md-6">
              <div
                className="team-card custom-team-card"
                style={{ backgroundImage: "url('/assets/img/bg/team-card-bg1-1.png')" }}
              >
                <div className="team-card_content">
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
                <div className="team-card_img">
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
      </div>
    </div>
  )
}

export default DynamicTeamSection
