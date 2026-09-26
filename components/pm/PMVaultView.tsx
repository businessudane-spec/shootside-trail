'use client';

import React, { useState } from 'react';
import {
  KeyRound,
  Plus,
  Search,
  Copy,
  Check,
  Eye,
  EyeOff,
  ExternalLink,
  Lock,
  ShieldCheck,
  Trash2,
  Edit2,
  X,
  AlertCircle,
  FolderLock,
  Globe,
  User,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMVaultItem } from '@/lib/pm-types';

const CATEGORIES = [
  'All',
  'Hosting & Servers',
  'Design Tools',
  'Social Media',
  'SaaS & Tools',
  'Development & APIs',
  'Finance & Payments',
  'General'
];

export const PMVaultView: React.FC = () => {
  const { user, isAdmin } = usePMAuth();
  const { vaultItems, createVaultItem, updateVaultItem, deleteVaultItem } = usePMData();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Password visibility map (id -> boolean)
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: number]: boolean }>({});
  // Copied feedback map (key -> boolean)
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<PMVaultItem | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCategory, setModalCategory] = useState('General');
  const [modalServiceUrl, setModalServiceUrl] = useState('');
  const [modalUsername, setModalUsername] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setModalTitle('');
    setModalCategory('General');
    setModalServiceUrl('');
    setModalUsername('');
    setModalPassword('');
    setModalNotes('');
    setModalError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: PMVaultItem) => {
    setEditingItem(item);
    setModalTitle(item.title);
    setModalCategory(item.category || 'General');
    setModalServiceUrl(item.service_url || '');
    setModalUsername(item.username || '');
    setModalPassword(item.password || '');
    setModalNotes(item.notes || '');
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let generated = '';
    for (let i = 0; i < 16; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setModalPassword(generated);
  };

  const handleSubmitModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim()) {
      setModalError('Service Title / Name is required.');
      return;
    }

    setIsSubmitting(true);
    setModalError(null);

    const payload: Partial<PMVaultItem> = {
      title: modalTitle.trim(),
      category: modalCategory,
      service_url: modalServiceUrl.trim(),
      username: modalUsername.trim(),
      password: modalPassword,
      notes: modalNotes.trim()
    };

    let res;
    if (editingItem) {
      res = await updateVaultItem(editingItem.id, payload);
    } else {
      res = await createVaultItem(payload);
    }

    setIsSubmitting(false);

    if (res.success) {
      setIsModalOpen(false);
    } else {
      setModalError(res.message || 'Operation failed');
    }
  };

  const handleDeleteItem = async (item: PMVaultItem) => {
    if (!confirm(`Delete credential for '${item.title}' from Company Vault?`)) return;
    await deleteVaultItem(item.id);
  };

  // Filter vault items
  const filteredItems = vaultItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      (item.username && item.username.toLowerCase().includes(query)) ||
      (item.service_url && item.service_url.toLowerCase().includes(query)) ||
      (item.notes && item.notes.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Hosting & Servers':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Design Tools':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Social Media':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SaaS & Tools':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Development & APIs':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Finance & Payments':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <KeyRound className="w-5 h-5 text-indigo-600" />
            <span>Company Password & Credentials Store</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Secure, shared team repository for company accounts, licenses, hosting, and API credentials.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer w-fit active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Credential</span>
        </button>
      </div>

      {/* Security Info Banner */}
      <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 flex items-start space-x-2.5">
        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Team Shared Store: </span>
          <span className="text-indigo-800">
            All authenticated team members have access to copy credentials. Every addition, change, or deletion is recorded in the system audit trail.
          </span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search credentials by service name, username, URL, or notes..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Credentials Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 space-y-3">
          <FolderLock className="w-10 h-10 mx-auto text-slate-300" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-700">No credentials found</p>
            <p className="text-xs text-slate-400">
              {searchQuery || selectedCategory !== 'All'
                ? 'Try adjusting your search query or category filter.'
                : 'Get started by adding your first company login or API key.'}
            </p>
          </div>
          {(!searchQuery && selectedCategory === 'All') && (
            <button
              onClick={openAddModal}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Credential</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => {
            const isPasswordVisible = !!visiblePasswords[item.id];
            const canDelete = isAdmin || (user && user.id === item.created_by);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                {/* Header: Title, Category & Actions */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md border font-bold ${getCategoryBadgeClass(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-sm truncate" title={item.title}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="Edit credential"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {canDelete && (
                        <button
                          onClick={() => handleDeleteItem(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete credential"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* URL Link if available */}
                  {item.service_url && (
                    <a
                      href={item.service_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] text-indigo-600 font-semibold hover:underline truncate max-w-full"
                    >
                      <Globe className="w-3 h-3 shrink-0" />
                      <span className="truncate">{item.service_url.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  )}
                </div>

                {/* Credential Details (Username & Password) */}
                <div className="space-y-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                  {/* Username / Email */}
                  {item.username && (
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Username / Email</span>
                      <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                        <span className="text-xs font-mono text-slate-800 font-semibold truncate select-all">
                          {item.username}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.username, `user-${item.id}`)}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer shrink-0"
                          title="Copy Username"
                        >
                          {copiedKey === `user-${item.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Password / Secret */}
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password / Key</span>
                    <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                      <span className="text-xs font-mono text-slate-900 font-bold truncate select-all">
                        {isPasswordVisible ? item.password : '••••••••••••••••'}
                      </span>
                      <div className="flex items-center space-x-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(item.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                          title={isPasswordVisible ? 'Hide' : 'Show'}
                        >
                          {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.password, `pass-${item.id}`)}
                          className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          title="Copy Password"
                        >
                          {copiedKey === `pass-${item.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notes / 2FA Instructions if available */}
                  {item.notes && (
                    <div className="pt-1 text-[11px] text-slate-600 leading-relaxed border-t border-slate-200/60 mt-2">
                      <span className="font-bold text-slate-500">Note: </span>
                      <span>{item.notes}</span>
                    </div>
                  )}
                </div>

                {/* Footer Metadata */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    {item.user?.avatar ? (
                      <img
                        src={item.user.avatar}
                        alt={item.user?.name}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>By {item.user?.name || 'Member'}</span>
                  </div>
                  <span className="font-mono">{item.created_at.substring(0, 10)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Credential Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    {editingItem ? 'Edit Credential' : 'Add New Credential to Vault'}
                  </h2>
                  <p className="text-[11px] text-slate-500">Shared safely with all team members</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitModal} className="p-5 space-y-4">
              {modalError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Service / Tool Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Canva Pro, Cloudflare"
                    value={modalTitle}
                    onChange={e => setModalTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={modalCategory}
                    onChange={e => setModalCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 bg-white"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service URL */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Login / Website URL</label>
                <input
                  type="url"
                  placeholder="https://app.example.com/login"
                  value={modalServiceUrl}
                  onChange={e => setModalServiceUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              {/* Username / Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Username / Email</label>
                <input
                  type="text"
                  placeholder="team.shootside@gmail.com"
                  value={modalUsername}
                  onChange={e => setModalUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              {/* Password / Secret */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Password / Secret Key *</label>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Generate Strong Password</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter or generate password..."
                  value={modalPassword}
                  onChange={e => setModalPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500 bg-slate-50/50"
                />
              </div>

              {/* Notes / 2FA Instructions */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Notes / 2FA / Recovery Details</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 2FA is sent to Sujith's mobile, or PIN is 1234..."
                  value={modalNotes}
                  onChange={e => setModalNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 bg-slate-50/50 resize-none"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingItem ? 'Update Credential' : 'Save to Vault'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
