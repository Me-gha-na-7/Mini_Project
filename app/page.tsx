import Link from 'next/link';
import { Zap, Users, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Support Made Simple
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Track, manage, and resolve customer support tickets with ease. Built for speed, designed for clarity.
        </p>
      </div>

      {/* Two Column CTA */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Customer Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">I Need Support</h2>
          <p className="text-slate-600 mb-6">
            Submit a new support ticket and track its progress in real-time
          </p>
          <Link
            href="/customer"
            className="inline-block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Submit a Ticket
          </Link>
        </div>

        {/* Agent Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Agent Dashboard</h2>
          <p className="text-slate-600 mb-6">
            View all tickets, update statuses, and provide timely customer support
          </p>
          <Link
            href="/agent"
            className="inline-block w-full text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-lg p-12 mt-12">
        <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Why Use SupportHub?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-900 mb-2">Fast Setup</h4>
            <p className="text-slate-600 text-sm">No database configuration needed</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-900 mb-2">Real-time Updates</h4>
            <p className="text-slate-600 text-sm">Instant ticket status changes</p>
          </div>
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-900 mb-2">Beautiful UI</h4>
            <p className="text-slate-600 text-sm">Modern, professional design</p>
          </div>
        </div>
      </div>
    </div>
  );
}
