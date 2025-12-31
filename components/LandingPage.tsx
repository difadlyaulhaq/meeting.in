'use client'
import { useAuth } from '@clerk/nextjs';
import { ArrowRight, Video, Users, Lock, Zap, Calendar, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Handler untuk navigasi
  const handleAuthAction = (action: 'sign-in' | 'sign-up') => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push(`/${action}`);
    }
  };

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/dashboard');
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <div className="w-full bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold">Meeting.in</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => handleAuthAction('sign-in')}
              className="px-6 py-2 text-gray-300 hover:text-white transition"
            >
              {isSignedIn ? 'Dashboard' : 'Sign In'}
            </button>
            <button 
              onClick={() => handleAuthAction('sign-up')}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {isSignedIn ? 'Go to App' : 'Get Started'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Simple, Fast, and <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Secure</span> Video Meetings
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Connect with anyone, anywhere. Crystal clear video conferencing with zero hassle setup.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2 group"
              >
                Start Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-3 border border-gray-600 rounded-lg hover:border-gray-400 transition font-medium">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full aspect-video bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-gray-700 flex items-center justify-center">
              <Video className="w-24 h-24 text-gray-600" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-blue-950/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Meeting.in?</h2>
            <p className="text-gray-400 text-lg">Everything you need for seamless video conferencing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                desc: "Ultra-low latency real-time communication powered by Stream"
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: "Secure & Private",
                desc: "End-to-end encryption keeps your conversations safe"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Multi-person",
                desc: "Host meetings with multiple participants effortlessly"
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Smart Scheduling",
                desc: "Plan and schedule meetings for future dates"
              },
              {
                icon: <Share2 className="w-8 h-8" />,
                title: "Easy Sharing",
                desc: "Generate meeting links and share them instantly"
              },
              {
                icon: <Video className="w-8 h-8" />,
                title: "HD Recording",
                desc: "Record and replay your important meetings anytime"
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-blue-600/50 transition group cursor-pointer">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600/40 transition">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1M+", label: "Active Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "150+", label: "Countries" },
              { number: "24/7", label: "Support" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-y border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users already using Meeting.in for better communication
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-10 py-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-bold text-lg"
          >
            {isSignedIn ? 'Go to Dashboard' : 'Create Free Account Now'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Meeting.in</h3>
              <p className="text-gray-400">Simple, fast, and secure video meetings for everyone.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Security", "Pricing"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Support", links: ["Help Center", "Contact", "Status"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
            <p className="text-gray-400">&copy; 2025 Meeting.in. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}