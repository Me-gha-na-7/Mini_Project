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

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)';
      case 'Medium':
        return 'linear-gradient(135deg, #eab308 0%, #facc15 100%)';
      case 'Low':
        return 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-900 font-bold text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div 
        className="rounded-2xl p-10 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
        }}
      >
        <h1 className="text-5xl font-bold text-white mb-3">Submit a Support Ticket</h1>
        <p className="text-xl text-white font-bold">
          Tell us what's wrong. We'll get back to you as soon as possible.
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="flex items-center gap-3 p-6 bg-green-100 border-4 border-green-500 rounded-xl shadow-lg">
          <CheckCircle className="w-8 h-8 text-green-700 flex-shrink-0" />
          <div>
            <h3 className="font-black text-green-900 text-lg">✅ Ticket submitted!</h3>
            <p className="text-green-800 font-bold">
              We'll review your ticket and get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} 
        className="rounded-2xl shadow-2xl p-10 space-y-6"
        style={{
          background: 'linear-gradient(135deg, #dbeafe 0%, #fce7f3 50%, #e0e7ff 100%)',
        }}
      >
        {/* Title */}
        <div>
          <label className="block text-lg font-black text-gray-900 mb-3">
            Ticket Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Brief summary of your issue"
            className="w-full px-5 py-4 border-4 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg font-bold bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-black text-gray-900 mb-3">
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
            className="w-full px-5 py-4 border-4 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg font-bold resize-none bg-white"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-lg font-black text-gray-900 mb-3">
            Priority *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Low', 'Medium', 'High'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFormData({ ...formData, priority: p })}
                style={
                  formData.priority === p
                    ? { background: getPriorityBg(p) }
                    : {}
                }
                className={`py-4 px-4 rounded-xl font-black border-4 transition text-base transform hover:scale-105 ${
                  formData.priority === p
                    ? 'text-white border-current shadow-lg'
                    : 'border-gray-400 bg-white text-gray-900 hover:border-gray-600'
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
          style={{
            background: !formData.title || !formData.description 
              ? '#d1d5db'
              : 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
          }}
          className="w-full py-4 px-6 text-white font-black rounded-xl transition text-lg shadow-lg transform hover:scale-105 disabled:scale-100"
        >
          Submit Ticket 🚀
        </button>
      </form>

      {/* Your Tickets */}
      {tickets.length > 0 && (
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-6">Your Tickets</h2>
          <div className="space-y-4">
            {tickets.map((ticket, idx) => (
              <div 
                key={ticket.id} 
                className="rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                style={{
                  background: idx % 3 === 0 
                    ? 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)'
                    : idx % 3 === 1
                    ? 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)'
                    : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{ticket.title}</h3>
                    <p className="text-sm text-gray-700 font-bold mt-1">🕐 {ticket.createdAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-black text-white"
                      style={{ background: getPriorityBg(ticket.priority) }}
                    >
                      {ticket.priority}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-black text-white border-2 border-gray-400"
                      style={{
                        background: ticket.status === 'Open'
                          ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
                          : ticket.status === 'In Progress'
                          ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
                          : 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-800 font-bold">{ticket.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {tickets.length === 0 && !submitted && (
        <div className="text-center py-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl border-4 border-dashed border-purple-400">
          <AlertCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <p className="text-gray-900 font-black text-lg">No tickets yet. Submit one to get started! 🎉</p>
        </div>
      )}
    </div>
  );
}
