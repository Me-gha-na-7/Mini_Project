import Link from 'next/link';
import { Zap, Users, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 p-4">
      {/* Hero Section */}
      <div 
        className="text-center py-20 rounded-3xl shadow-2xl p-8"
        style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
        }}
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          Support Made Simple
        </h1>
        <p className="text-2xl text-white font-bold max-w-2xl mx-auto">
          Track, manage, and resolve customer support tickets with ease. Built for speed, designed for clarity.
        </p>
      </div>

      {/* Two Column CTA */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        {/* Customer Card */}
        <div 
          className="rounded-2xl shadow-2xl p-12 hover:shadow-3xl transition transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
          }}
        >
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-6 shadow-lg">
            <Zap className="w-8 h-8 text-cyan-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">I Need Support</h2>
          <p className="text-white font-bold text-lg mb-8">
            Submit a new support ticket and track its progress in real-time
          </p>
          <Link
            href="/customer"
            className="inline-block w-full text-center px-6 py-4 bg-white text-cyan-600 font-black rounded-xl hover:bg-cyan-50 transition text-lg shadow-lg"
          >
            Submit a Ticket →
          </Link>
        </div>

        {/* Agent Card */}
        <div 
          className="rounded-2xl shadow-2xl p-12 hover:shadow-3xl transition transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
          }}
        >
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-6 shadow-lg">
            <Users className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Agent Dashboard</h2>
          <p className="text-white font-bold text-lg mb-8">
            View all tickets, update statuses, and provide timely customer support
          </p>
          <Link
            href="/agent"
            className="inline-block w-full text-center px-6 py-4 bg-white text-rose-600 font-black rounded-xl hover:bg-rose-50 transition text-lg shadow-lg"
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>

      {/* Features */}
      <div 
        className="rounded-2xl shadow-2xl p-16"
        style={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 50%, #8b5cf6 100%)',
        }}
      >
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Why Use SupportHub?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl border-2 border-white">
            <CheckCircle className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <h4 className="font-bold text-white mb-2 text-xl">Fast Setup</h4>
            <p className="text-white font-bold text-base">No database configuration needed</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl border-2 border-white">
            <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
            <h4 className="font-bold text-white mb-2 text-xl">Real-time Updates</h4>
            <p className="text-white font-bold text-base">Instant ticket status changes</p>
          </div>
          <div className="text-center bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-xl border-2 border-white">
            <CheckCircle className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
            <h4 className="font-bold text-white mb-2 text-xl">Beautiful UI</h4>
            <p className="text-white font-bold text-base">Modern, professional design</p>
          </div>
        </div>
      </div>
    </div>
  );
}
