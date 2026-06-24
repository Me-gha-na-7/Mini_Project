'use client';

import { useState, useEffect } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}

export default function AgentPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('supportTickets');
    if (saved) {
      setTickets(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const updateTicketStatus = (id: string, newStatus: 'Open' | 'In Progress' | 'Resolved') => {
    const updated = tickets.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    setTickets(updated);
    localStorage.setItem('supportTickets', JSON.stringify(updated));
  };

  const deleteTicket = (id: string) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    localStorage.setItem('supportTickets', JSON.stringify(updated));
  };

  const filteredTickets = tickets.filter((t) =>
    filter === 'All' ? true : t.status === filter
  );

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

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Open':
        return 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)';
      case 'In Progress':
        return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
      case 'Resolved':
        return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
      default:
        return '';
    }
  };

  const stats = [
    { label: 'Total Tickets', value: tickets.length, gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)' },
    { label: 'Open', value: tickets.filter((t) => t.status === 'Open').length, gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' },
    { label: 'In Progress', value: tickets.filter((t) => t.status === 'In Progress').length, gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
    { label: 'Resolved', value: tickets.filter((t) => t.status === 'Resolved').length, gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
  ];

  if (loading) {
    return <div className="text-center py-12 text-gray-900 font-bold text-lg">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div 
        className="rounded-2xl p-10 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
        }}
      >
        <h1 className="text-5xl font-bold text-white mb-3">Agent Dashboard</h1>
        <p className="text-xl text-white font-bold">
          Manage support tickets and keep customers happy.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-8 shadow-lg text-white transform hover:scale-105 transition"
            style={{ background: stat.gradient }}
          >
            <p className="text-sm font-black mb-2">
              {stat.label}
            </p>
            <p className="text-4xl font-black">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={
              filter === f
                ? { background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }
                : {}
            }
            className={`px-6 py-3 rounded-xl font-black transition text-base transform hover:scale-105 ${
              filter === f
                ? 'text-white shadow-lg'
                : 'bg-white border-4 border-gray-400 text-gray-900 hover:border-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      {filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket, idx) => (
            <div
              key={ticket.id}
              className="rounded-xl shadow-lg border-4 border-blue-300 overflow-hidden hover:shadow-2xl transition"
              style={{
                background: idx % 3 === 0
                  ? 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)'
                  : idx % 3 === 1
                  ? 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)'
                  : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              }}
            >
              {/* Ticket Header (Always Visible) */}
              <div
                className="p-6 cursor-pointer flex items-start justify-between hover:bg-white hover:bg-opacity-30 transition"
                onClick={() =>
                  setExpandedId(expandedId === ticket.id ? null : ticket.id)
                }
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-black text-gray-900">
                      {ticket.title}
                    </h3>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-black text-white shadow-lg"
                      style={{ background: getPriorityBg(ticket.priority) }}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 font-bold">🕐 {ticket.createdAt}</p>
                </div>
                <ChevronDown
                  className={`w-8 h-8 text-gray-800 transition font-black ${
                    expandedId === ticket.id ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {/* Ticket Details (Expandable) */}
              {expandedId === ticket.id && (
                <div className="border-t-4 border-gray-300 p-6 bg-white bg-opacity-50 space-y-4">
                  {/* Description */}
                  <div>
                    <h4 className="font-black text-gray-900 mb-2 text-lg">📝 Description</h4>
                    <p className="text-gray-800 whitespace-pre-wrap font-bold text-base">
                      {ticket.description}
                    </p>
                  </div>

                  {/* Status Selection */}
                  <div>
                    <h4 className="font-black text-gray-900 mb-3 text-lg">🔄 Update Status</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Open', 'In Progress', 'Resolved'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateTicketStatus(ticket.id, s)}
                          style={
                            ticket.status === s
                              ? { background: getStatusBg(s) }
                              : {}
                          }
                          className={`py-3 px-3 rounded-xl text-sm font-black transition border-4 transform hover:scale-105 ${
                            ticket.status === s
                              ? 'text-white border-white shadow-lg'
                              : 'bg-white border-gray-400 text-gray-900 hover:border-gray-600'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="pt-4 border-t-4 border-gray-300">
                    <button
                      onClick={() => deleteTicket(ticket.id)}
                      style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                      }}
                      className="flex items-center gap-2 px-5 py-3 text-white font-black rounded-xl transition border-4 border-red-700 transform hover:scale-105 shadow-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Ticket
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 rounded-2xl border-4 border-dashed border-green-400"
          style={{
            background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
          }}
        >
          <p className="text-gray-900 text-lg font-black">
            {filter === 'All'
              ? 'No tickets yet. Great job! 🎉'
              : `No ${filter.toLowerCase()} tickets right now.`}
          </p>
        </div>
      )}
    </div>
  );
}
