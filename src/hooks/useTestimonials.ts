import { useState, useEffect } from 'react'

export interface Testimonial {
  _id: string
  clientName: string
  designation: string
  photo: string
  title: string
  text: string
  rating: number
  showAsSatisfiedClient: boolean
  order: number
  isActive: boolean
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [satisfiedClients, setSatisfiedClients] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/testimonials?active=true`).then(r => r.json()),
      fetch(`${API_URL}/testimonials?satisfiedOnly=true`).then(r => r.json()),
    ]).then(([all, satisfied]) => {
      if (all.success) setTestimonials(all.data)
      if (satisfied.success) setSatisfiedClients(satisfied.data)
    }).catch(() => {})
    .finally(() => setLoading(false))
  }, [])

  return { testimonials, satisfiedClients, loading }
}
