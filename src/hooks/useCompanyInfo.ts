import { useState, useEffect } from 'react';

export interface CompanyAddress {
  _id?: string;
  label: string;
  fullAddress: string;
  city: string;
  state: string;
  country: string;
  order: number;
}

export interface CompanyInfo {
  companyName: string;
  tagline: string;
  aboutText: string;
  rcNumber: string;
  foundedYear: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  emailSupport: string;
  addresses: CompanyAddress[];
  workingDays: string;
  workingHours: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  whatsapp: string;
}

const DEFAULTS: CompanyInfo = {
  companyName: 'GAMSAJ International Limited',
  tagline: '',
  aboutText: 'Nigerian indigenous construction, real estate, infrastructure, and industrial engineering company delivering world-class solutions across Nigeria.',
  rcNumber: '965221',
  foundedYear: '2011',
  phone: '+234 800 000 0000',
  phoneSecondary: '',
  email: 'info@gamsaj.com',
  emailSupport: '',
  addresses: [
    { label: 'Head Office', fullAddress: '', city: 'Abuja', state: 'FCT', country: 'Nigeria', order: 0 },
  ],
  workingDays: 'Mon - Sat',
  workingHours: '8am - 5pm',
  facebook: 'https://facebook.com/',
  twitter: 'https://twitter.com/',
  instagram: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/',
  youtube: '',
  whatsapp: '',
};

/** Format a CompanyAddress into a single display string */
export const formatAddress = (addr: CompanyAddress): string =>
  [addr.fullAddress, addr.city, addr.state, addr.country].filter(Boolean).join(', ');

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useCompanyInfo = () => {
  const [info, setInfo] = useState<CompanyInfo>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/company-info`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          const merged = { ...DEFAULTS, ...data.data };
          // Ensure addresses is always an array
          if (!Array.isArray(merged.addresses) || merged.addresses.length === 0) {
            merged.addresses = DEFAULTS.addresses;
          }
          setInfo(merged);
        }
      })
      .catch(() => { /* keep defaults */ })
      .finally(() => setLoading(false));
  }, []);

  return { info, loading };
};
