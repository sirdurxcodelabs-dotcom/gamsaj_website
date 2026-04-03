import { useState, useEffect } from 'react'

export interface TeamMember {
  _id: string
  name: string
  designation: string
  photo: string
  phone: string
  email: string
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  bio: string
  order: number
  isActive: boolean
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useTeam = (limit?: number) => {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams({ active: 'true' })
    if (limit) params.set('limit', String(limit))
    fetch(`${API_URL}/team?${params}`)
      .then(r => r.json())
      .then(d => { if (d.success) setMembers(d.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [limit])

  return { members, loading }
}
