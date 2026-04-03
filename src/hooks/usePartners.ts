import { useState, useEffect } from 'react'

export interface Partner {
  _id: string
  name: string
  logo: string
  website: string
  contactName: string
  contactEmail: string
  contactPhone: string
  order: number
  isActive: boolean
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const usePartners = () => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/partners?active=true`)
      .then(r => r.json())
      .then(d => { if (d.success) setPartners(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { partners, loading }
}
