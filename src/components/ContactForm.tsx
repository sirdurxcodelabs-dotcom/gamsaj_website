import { useState, FormEvent } from 'react';
import { submitContactForm } from '../services/api';

const ContactForm = () => {
  const [reasonForContact, setReasonForContact] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const reasonOptions = [
    { value: 'General Inquiry', label: 'General Inquiry' },
    { value: 'Support', label: 'Technical Support' },
    { value: 'Partnership', label: 'Partnership Opportunity' },
    { value: 'Feedback', label: 'Feedback' },
    { value: 'Other', label: 'Other' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReasonForContact(e.target.value);
    // Reset form when reason changes
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      subject: e.target.value,
      message: '',
    });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!reasonForContact) {
      setMessage({ type: 'error', text: 'Please select a reason for contact' });
      setLoading(false);
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      setLoading(false);
      return;
    }

    // Submit to backend
    const result = await submitContactForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      subject: formData.subject || reasonForContact,
      message: formData.message,
      reasonForContact: reasonForContact,
    });

    setLoading(false);

    if (result.success) {
      setMessage({
        type: 'success',
        text: 'Thank you for contacting us! We will get back to you soon.',
      });
      // Reset form
      setReasonForContact('');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
    } else {
      setMessage({
        type: 'error',
        text: result.message || 'Failed to submit form. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form ajax-contact">
      <div className="row gy-4">
        {/* Reason for Contact - Always visible */}
        <div className="col-12">
          <div className="form-group">
            <select
              className="form-control form-select"
              value={reasonForContact}
              onChange={handleReasonChange}
              required
            >
              <option value="">Select Reason for Contact *</option>
              {reasonOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Show rest of form only after reason is selected */}
        {reasonForContact && (
          <>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company / Organization (Optional)"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  cols={30}
                  rows={3}
                  className="form-control"
                  placeholder="Message... *"
                  required
                ></textarea>
              </div>
            </div>
            <div className="form-btn col-12">
              <button className="btn w-100" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Now'}{' '}
                <i className="ri-arrow-right-up-line"></i>
              </button>
            </div>
          </>
        )}
      </div>
      {message.text && (
        <p
          className={`form-messages mb-0 mt-3 ${
            message.type === 'success' ? 'text-success' : 'text-danger'
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
