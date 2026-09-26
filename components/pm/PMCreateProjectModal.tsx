'use client';

import React, { useState } from 'react';
import { X, FolderPlus } from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';
import { usePMAuth } from '@/lib/pm-auth-context';
import { PriorityLevel, ProjectStatus } from '@/lib/pm-types';

interface PMCreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PMCreateProjectModal: React.FC<PMCreateProjectModalProps> = ({ isOpen, onClose }) => {
  const { users, createProject } = usePMData();
  const { user } = usePMAuth();

  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [projectManagerId, setProjectManagerId] = useState<number>(user?.id || 1);
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [priority, setPriority] = useState<PriorityLevel>('Medium');
  const [status, setStatus] = useState<ProjectStatus>('Active');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const res = await createProject({
      project_name: projectName,
      client_name: clientName,
      description,
      start_date: startDate || null,
      deadline: deadline || null,
      project_manager_id: Number(projectManagerId),
      priority,
      status,
      members: selectedMemberIds.map(id => ({ id } as any))
    });

    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.message || 'Failed to create project');
    }
  };

  const toggleMember = (id: number) => {
    setSelectedMemberIds(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">Create New Project</h2>
              <p className="text-[11px] text-slate-500 font-medium">Admin Authorization Required</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(85vh-120px)] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. ShootSide Brand Redesign"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Client Name</label>
              <input
                type="text"
                placeholder="e.g. ShootSide Media / External Client"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Project Manager</label>
              <select
                value={projectManagerId}
                onChange={e => setProjectManagerId(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none font-medium"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Description & Deliverables</label>
            <textarea
              rows={3}
              placeholder="Detailed scope, milestone roadmap, and targets..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none"
              >
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Assigned Members */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Assign Team Members</label>
            <div className="grid grid-cols-2 gap-2">
              {users.map(u => {
                const isSelected = selectedMemberIds.includes(u.id);
                return (
                  <button
                    type="button"
                    key={u.id}
                    onClick={() => toggleMember(u.id)}
                    className={`flex items-center space-x-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-400 text-blue-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full object-cover border border-slate-200" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">{u.name}</p>
                      <p className="text-[9px] text-slate-500 font-semibold">{u.role}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-bold border border-slate-200 cursor-pointer shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 cursor-pointer transition-all"
            >
              {isSubmitting ? 'Saving...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
