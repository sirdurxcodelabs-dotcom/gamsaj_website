import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { usePartners } from '../../../hooks/usePartners'

interface Props {
  variant?: 'dark' | 'light'  // dark = with background image, light = plain
  centerMode?: boolean
  className?: string
}

const SLIDER_SETTINGS = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  speed: 1500,
  autoplaySpeed: 4000,
  arrows: false,
  dots: false,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 992, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
}

// Fallback logos when no partners in DB yet
const FALLBACK = [
  '/assets/img/client/client-1-1.svg',
  '/assets/img/client/client-1-2.svg',
  '/assets/img/client/client-1-3.svg',
  '/assets/img/client/client-1-4.svg',
  '/assets/img/client/client-1-5.svg',
]

const DynamicClientSection = ({ variant = 'dark', centerMode = false, className = '' }: Props) => {
  const { partners, loading } = usePartners()

  if (loading) return null

  // Use fallback if no partners configured yet
  const useFallback = partners.length === 0
  const useSlider = useFallback || partners.length > 5

  const wrapperClass = variant === 'dark'
    ? `client-area-1 home-one-client text-center space overflow-hidden shape-mockup-wrap background-image ${className}`
    : `client-area-2 text-center space overflow-hidden ${className}`

  const wrapperStyle = variant === 'dark'
    ? { backgroundImage: "url('/assets/img/bg/client-bg1-1.png')" }
    : {}

  const renderLogo = (src: string, name: string, url: string, key: string) => (
    <div key={key} className="col-lg-auto">
      <div className="client-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 16px' }}>
        <Link to={url || '/'} target={url && url !== '/' ? '_blank' : undefined} rel="noopener noreferrer">
          <img
            src={src || '/assets/img/client/client-1-1.svg'}
            alt={name}
            style={{ maxHeight: 60, maxWidth: 140, width: 'auto', height: 'auto', objectFit: 'contain' }}
          />
        </Link>
      </div>
    </div>
  )

  const logoItems = useFallback
    ? FALLBACK.map((src, i) => renderLogo(src, `Partner ${i + 1}`, '/', `fallback-${i}`))
    : partners.map(p => renderLogo(p.logo || '/assets/img/client/client-1-1.svg', p.name, p.website || '/', p._id))

  return (
    <div className={wrapperClass} style={wrapperStyle} data-overlay={variant === 'dark' ? 'title' : undefined} data-opacity={variant === 'dark' ? '9' : undefined}>
      {variant === 'dark' && (
        <div className="client_shape_1-1 shape-mockup jump-reverse" style={{ bottom: '0px', right: '-6%' }}>
          <img src="/assets/img/shape/client-bg-shape1.png" alt="img" />
        </div>
      )}
      <div className="container">
        <div className="title-area text-center">
          <span className={`sub-title ${variant === 'dark' ? 'text-white' : ''}`}>
            <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
            Happy Clients
          </span>
          <h2 className={`sec-title ${variant === 'dark' ? 'text-white' : ''}`}>Our trusted partners</h2>
        </div>

        {useSlider ? (
          <Slider
            {...SLIDER_SETTINGS}
            centerMode={centerMode}
            className="row global-carousel client-slider1"
          >
            {logoItems}
          </Slider>
        ) : (
          <div className="row justify-content-center gy-30">
            {logoItems}
          </div>
        )}
      </div>
    </div>
  )
}

export default DynamicClientSection
