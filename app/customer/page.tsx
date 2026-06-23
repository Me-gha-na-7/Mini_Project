'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export default function CustomerPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load tickets from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('supportTickets');
    if (saved) {
      setTickets(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: 'Open',
      createdAt: new Date().toLocaleString(),
    };

    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));

    setFormData({ title: '', description: '', priority: 'Medium' });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 5000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border border-green-300';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'text-blue-600';
      case 'In Progress':
        return 'text-orange-600';
      case 'Resolved':
        return 'text-green-600';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Submit a Support Ticket</h1>
        <p className="text-lg text-slate-600">
          Tell us what's wrong. We'll get back to you as soon as possible.
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-900">Ticket submitted!</h3>
            <p className="text-sm text-green-700">
              We'll review your ticket and get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Ticket Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Brief summary of your issue"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe your issue in detail..."
            rows={6}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Priority *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Low', 'Medium', 'High'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFormData({ ...formData, priority: p })}
                className={`py-3 px-4 rounded-lg font-medium border-2 transition ${
                  formData.priority === p
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formData.title || !formData.description}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition"
        >
          Submit Ticket
        </button>
      </form>

      {/* Your Tickets */}
      {tickets.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Tickets</h2>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{ticket.title}</h3>
                    <p className="text-sm text-slate-600">{ticket.createdAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border border-slate-300 ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <p className="text-slate-700">{ticket.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {tickets.length === 0 && !submitted && (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">No tickets yet. Submit one above to get started!</p>
        </div>
      )}
    </div>
  );
}
