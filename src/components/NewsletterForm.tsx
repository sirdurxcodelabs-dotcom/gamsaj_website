import { useState, FormEvent } from 'react';
import { subscribeNewsletter } from '../services/api';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      setLoading(false);
      return;
    }

    // Submit to backend
    const result = await subscribeNewsletter(email);

    setLoading(false);

    if (result.success) {
      setMessage({
        type: 'success',
        text: 'Successfully subscribed to our newsletter!',
      });
      setEmail('');
    } else {
      setMessage({
        type: 'error',
        text: result.message || 'Failed to subscribe. Please try again.',
      });
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 5000);
  };

  return (
    <>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn style2" disabled={loading}>
          {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          <i className="ri-arrow-right-up-line"></i>
        </button>
      </form>
      {message.text && (
        <p
          className={`mt-2 mb-0 ${
            message.type === 'success' ? 'text-success' : 'text-danger'
          }`}
          style={{ fontSize: '14px' }}
        >
          {message.text}
        </p>
      )}
    </>
  );
};

export default NewsletterForm;
