import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUrls, createShortUrl, deleteUrl, redirectToUrl } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ shortCode: '', longCode: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const [clicks,setClicks] = useState(0);

  useEffect(() => {
    loadUrls();
  }, []);

  const loadUrls = async () => {
    try {
      setLoading(true);
      const data = await fetchUrls();
      if (Array.isArray(data)) {
        setUrls(data);
      } else if (data.message === 'No entries Created') {
        setUrls([]);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load URLs');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.shortCode || !formData.longCode) {
      setError('Both fields are required');
      return;
    }

    // Validate URL format
    try {
      new URL(formData.longCode);
    } catch {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setCreating(true);

    try {
      const response = await createShortUrl(formData.shortCode, formData.longCode);
      if (response.completed) {
        setSuccess('Short URL created successfully!');
        setFormData({ shortCode: '', longCode: '' });
        loadUrls();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create short URL');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (shortCode) => {
    if (!window.confirm(`Delete short URL: ${shortCode}?`)) return;

    try {
      await deleteUrl(shortCode);
      setSuccess('URL deleted successfully!');
      loadUrls();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete URL');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      navigate('/login');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSuccess('Copied to clipboard!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>URL Shortener Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="create-url-section">
        <h2>Create New Short URL</h2>
        <form onSubmit={handleSubmit} className="url-form">
          <div className="form-row">
            <input
              type="text"
              name="shortCode"
              value={formData.shortCode}
              onChange={handleChange}
              placeholder="Short code (e.g., mylink)"
              required
            />
            <input
              type="text"
              name="longCode"
              value={formData.longCode}
              onChange={handleChange}
              placeholder="Long URL (e.g., https://example.com/very/long/url)"
              required
            />
            <button type="submit" className="btn-create" disabled={creating}>
              {creating ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}
      </div>

      <div className="urls-section">
        <h2>Your Short URLs</h2>
        {loading ? (
          <p className="loading">Loading URLs...</p>
        ) : urls.length === 0 ? (
          <p className="no-urls">No URLs created yet. Create your first one above!</p>
        ) : (
          <div className="urls-grid">
            {urls.map((url) => (
              <div key={url._id} className="url-card">
                <div className="url-header">
                  <h3>{url.shortCode}</h3>
                  <button
                    onClick={() => handleDelete(url.shortCode)}
                    className="btn-delete"
                    title="Delete URL"
                  >
                    🗑️
                  </button>
                </div>
                <div className="url-details">
                  <div className="url-item">
                    <span className="label">Short URL:</span>
                    <div className="url-value">
                      <a
                        href={redirectToUrl(url.shortCode)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={()=>setClicks(clicks+1)}
                      >
                        {url.shortCode}
                      </a>
                      <button
                        onClick={() => {
                            copyToClipboard(redirectToUrl(url.shortCode))
                        }}
                        className="btn-copy"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                  <div className="url-item">
                    <span className="label">Original URL:</span>
                    <div className="url-value long-url">
                        {url.longCode}
                    </div>
                  </div>
                  <div className="url-stats">
                    <span>👁️ Clicks: {clicks}</span>
                    <span>📅 Created: {new Date(url.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
