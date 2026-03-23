import { useState, useEffect } from 'react';

export interface NavigationItem {
  title: string;
  path: string;
}

export interface NavigationGroup {
  title: string;
  type: 'single' | 'dropdown';
  path?: string;
  items?: NavigationItem[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useNavigation = () => {
  const [navigation, setNavigation] = useState<NavigationGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNavigation();
  }, []);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/navigation`);
      const data = await response.json();

      if (data.success) {
        setNavigation(data.data);
      } else {
        setError('Failed to load navigation');
      }
    } catch (err) {
      console.error('Error fetching navigation:', err);
      setError('Error loading navigation');
      // Fallback to default navigation if API fails
      setNavigation(getDefaultNavigation());
    } finally {
      setLoading(false);
    }
  };

  return { navigation, loading, error, refetch: fetchNavigation };
};

// Fallback navigation if API fails
const getDefaultNavigation = (): NavigationGroup[] => [
  {
    title: 'HOME',
    type: 'single',
    path: '/',
  },
  {
    title: 'ABOUT',
    type: 'single',
    path: '/about',
  },
  {
    title: 'SERVICES',
    type: 'dropdown',
    items: [
      { title: 'Service', path: '/service' },
      { title: 'Service Details', path: '/service-details' },
    ],
  },
  {
    title: 'PAGES',
    type: 'dropdown',
    items: [
      { title: 'Project Page', path: '/project' },
      { title: 'Project Details', path: '/project-details' },
      { title: 'Team Page', path: '/team' },
      { title: 'Team Details', path: '/team-details' },
      { title: 'Shop Page', path: '/shop' },
      { title: 'Shop Details', path: '/shop-details' },
      { title: 'Cart', path: '/cart' },
      { title: 'Checkout', path: '/checkout' },
      { title: 'Wishlist', path: '/wishlist' },
    ],
  },
  {
    title: 'NEWS',
    type: 'dropdown',
    items: [
      { title: 'News', path: '/blog' },
      { title: 'News Details', path: '/blog-details' },
    ],
  },
  {
    title: 'CONTACT',
    type: 'single',
    path: '/contact',
  },
];
