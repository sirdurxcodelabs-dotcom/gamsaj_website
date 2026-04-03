import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
}

const BASE = 'GAMSAJ International Limited'
const SITE_URL = 'https://gamsaj.com'
const DEFAULT_IMAGE = `${SITE_URL}/assets/img/GamSaj Logo.png`

export const useSEO = ({ title, description, keywords, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    // Title
    document.title = `${title} | ${BASE}`

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    setMeta('description', description)
    if (keywords) setMeta('keywords', keywords)

    // Canonical
    const canon = canonical ? `${SITE_URL}${canonical}` : SITE_URL
    setLink('canonical', canon)

    // OG
    setMeta('og:title', `${title} | ${BASE}`, true)
    setMeta('og:description', description, true)
    setMeta('og:url', canon, true)
    setMeta('og:image', ogImage || DEFAULT_IMAGE, true)

    // Twitter
    setMeta('twitter:title', `${title} | ${BASE}`)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage || DEFAULT_IMAGE)
  }, [title, description, keywords, canonical, ogImage])
}
