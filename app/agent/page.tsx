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

  // Load tickets from localStorage
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
        return 'bg-blue-100 text-blue-800 border border-blue-300';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800 border border-orange-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border border-green-300';
      default:
        return '';
    }
  };

  const stats = [
    { label: 'Total Tickets', value: tickets.length, color: 'blue' },
    { label: 'Open', value: tickets.filter((t) => t.status === 'Open').length, color: 'blue' },
    { label: 'In Progress', value: tickets.filter((t) => t.status === 'In Progress').length, color: 'orange' },
    { label: 'Resolved', value: tickets.filter((t) => t.status === 'Resolved').length, color: 'green' },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Agent Dashboard</h1>
        <p className="text-lg text-slate-600">
          Manage support tickets and keep customers happy.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-${stat.color}-50 border border-${stat.color}-200 rounded-lg p-6`}
          >
            <p className={`text-sm font-medium text-${stat.color}-700 mb-1`}>
              {stat.label}
            </p>
            <p className={`text-3xl font-bold text-${stat.color}-900`}>
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
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      {filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden hover:shadow-lg transition"
            >
              {/* Ticket Header (Always Visible) */}
              <div
                className="p-6 cursor-pointer flex items-start justify-between"
                onClick={() =>
                  setExpandedId(expandedId === ticket.id ? null : ticket.id)
                }
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-900">
                      {ticket.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{ticket.createdAt}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition ${
                    expandedId === ticket.id ? 'rotate-180' : ''
                  }`}
                />
              </div>

              {/* Ticket Details (Expandable) */}
              {expandedId === ticket.id && (
                <div className="border-t border-slate-200 p-6 bg-slate-50 space-y-4">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Description
                    </h4>
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {ticket.description}
                    </p>
                  </div>

                  {/* Status Selection */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">
                      Update Status
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Open', 'In Progress', 'Resolved'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateTicketStatus(ticket.id, s)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition border-2 ${
                            ticket.status === s
                              ? `${getStatusColor(s)} border-current`
                              : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="pt-4 border-t border-slate-300">
                    <button
                      onClick={() => deleteTicket(ticket.id)}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Ticket
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-300">
          <p className="text-slate-600 text-lg">
            {filter === 'All'
              ? 'No tickets yet. Great job! 🎉'
              : `No ${filter.toLowerCase()} tickets right now.`}
          </p>
        </div>
      )}
    </div>
  );
}
