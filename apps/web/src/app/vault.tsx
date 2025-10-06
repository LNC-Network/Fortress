import  { useState } from 'react';
import {
  Lock,
  Plus,
  Search,
  Eye,
  EyeOff,
  Copy,
  Edit2,
  Trash2,
  Key,
  Mail,
  Globe,
  CreditCard,
  Shield,
} from 'lucide-react';

export default function PasswordVault() {
  const [secrets, setSecrets] = useState([
    {
      id: 1,
      title: 'Gmail',
      username: 'user@gmail.com',
      password: 'SecurePass123!',
      url: 'https://gmail.com',
      category: 'email',
      notes: 'Primary email account',
    },
    {
      id: 2,
      title: 'GitHub',
      username: 'devuser',
      password: 'GitSecure456@',
      url: 'https://github.com',
      category: 'development',
      notes: 'Work account',
    },
    {
      id: 3,
      title: 'AWS Console',
      username: 'admin@company.com',
      password: 'AWS#Secure789',
      url: 'https://aws.amazon.com',
      category: 'cloud',
      notes: 'Production environment',
    },
  ]);

  const [showPassword, setShowPassword] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingSecret, setEditingSecret] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    'all',
    'email',
    'social',
    'banking',
    'development',
    'cloud',
    'other',
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'banking':
        return <CreditCard className="w-4 h-4" />;
      case 'development':
        return <Key className="w-4 h-4" />;
      case 'cloud':
        return <Globe className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSecrets = secrets.filter((secret) => {
    const matchesSearch =
      secret.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      secret.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      secret.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || secret.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveSecret = (secretData) => {
    if (editingSecret) {
      setSecrets(
        secrets.map((s) =>
          s.id === editingSecret.id
            ? { ...secretData, id: editingSecret.id }
            : s
        )
      );
    } else {
      setSecrets([...secrets, { ...secretData, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingSecret(null);
  };

  const handleDeleteSecret = (id) => {
    if (window.confirm('Are you sure you want to delete this secret?')) {
      setSecrets(secrets.filter((s) => s.id !== id));
    }
  };

  const openEditModal = (secret) => {
    setEditingSecret(secret);
    setShowModal(true);
  };

  const openNewModal = () => {
    setEditingSecret(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <Lock className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Password Vault
                </h1>
                <p className="text-purple-300 text-sm">
                  Secure credential management
                </p>
              </div>
            </div>
            <button
              onClick={openNewModal}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Secret
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search secrets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800/50 text-purple-300 hover:bg-slate-800 border border-purple-500/20'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Secrets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSecrets.map((secret) => (
            <div
              key={secret.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    {getCategoryIcon(secret.category)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {secret.title}
                    </h3>
                    <span className="text-xs text-purple-300 capitalize">
                      {secret.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(secret)}
                    className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSecret(secret.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-purple-300 mb-1 block">
                    Username
                  </label>
                  <div className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2">
                    <span className="text-sm text-white truncate">
                      {secret.username}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          secret.username,
                          `${secret.id}-username`
                        )
                      }
                      className="text-purple-400 hover:text-purple-300"
                    >
                      {copiedId === `${secret.id}-username` ? (
                        <span className="text-xs text-green-400">Copied!</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-purple-300 mb-1 block">
                    Password
                  </label>
                  <div className="flex items-center justify-between bg-slate-900/50 rounded-lg px-3 py-2">
                    <span className="text-sm text-white font-mono">
                      {showPassword[secret.id]
                        ? secret.password
                        : '••••••••••••'}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => togglePasswordVisibility(secret.id)}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        {showPassword[secret.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            secret.password,
                            `${secret.id}-password`
                          )
                        }
                        className="text-purple-400 hover:text-purple-300"
                      >
                        {copiedId === `${secret.id}-password` ? (
                          <span className="text-xs text-green-400">
                            Copied!
                          </span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {secret.url && (
                  <div>
                    <label className="text-xs text-purple-300 mb-1 block">
                      URL
                    </label>
                    <a
                      href={secret.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:text-purple-300 underline truncate block"
                    >
                      {secret.url}
                    </a>
                  </div>
                )}

                {secret.notes && (
                  <div>
                    <label className="text-xs text-purple-300 mb-1 block">
                      Notes
                    </label>
                    <p className="text-sm text-slate-300 bg-slate-900/50 rounded-lg px-3 py-2">
                      {secret.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredSecrets.length === 0 && (
          <div className="text-center py-16">
            <Lock className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No secrets found
            </h3>
            <p className="text-purple-300">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <SecretModal
          secret={editingSecret}
          onSave={handleSaveSecret}
          onClose={() => {
            setShowModal(false);
            setEditingSecret(null);
          }}
        />
      )}
    </div>
  );
}

function SecretModal({ secret, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: secret?.title || '',
    username: secret?.username || '',
    password: secret?.password || '',
    url: secret?.url || '',
    category: secret?.category || 'other',
    notes: secret?.notes || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const generatePassword = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, password });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl border border-purple-500/30 max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          {secret ? 'Edit Secret' : 'Add New Secret'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-purple-300 mb-2 block">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-2 block">
              Username/Email
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-2 block">
              Password
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="flex-1 px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="button"
                onClick={generatePassword}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Key className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-2 block">
              URL (optional)
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-2 block">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="email">Email</option>
              <option value="social">Social</option>
              <option value="banking">Banking</option>
              <option value="development">Development</option>
              <option value="cloud">Cloud</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-purple-300 mb-2 block">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              {secret ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
