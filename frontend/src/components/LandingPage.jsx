import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Tutoring',
      description: 'Get personalized explanations and step-by-step guidance tailored to your learning style and pace.'
    },
    {
      icon: '📚',
      title: 'Multiple Subjects',
      description: 'Master mathematics, science, literature, history, and more with comprehensive study materials.'
    },
    {
      icon: '💬',
      title: 'Interactive Learning',
      description: 'Engage in natural conversations, ask follow-up questions, and get instant clarification.'
    },
    {
      icon: '📈',
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed insights and personalized recommendations.'
    },
    {
      icon: '⚡',
      title: 'Instant Feedback',
      description: 'Receive immediate responses to your questions and corrections for better understanding.'
    },
    {
      icon: '🎯',
      title: 'Focused Learning',
      description: 'Target specific topics and skills with curated content and practice exercises.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'High School Student',
      content: 'PrepStudent helped me understand calculus concepts that I struggled with for months. The AI explanations are so clear!',
      avatar: '👩‍🎓'
    },
    {
      name: 'Marcus Johnson',
      role: 'College Freshman',
      content: 'The interactive approach makes studying actually enjoyable. I can ask questions without feeling judged.',
      avatar: '👨‍🎓'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Graduate Student',
      content: 'Perfect for reviewing complex topics. The AI adapts to my learning pace and provides exactly what I need.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">PS</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-800">PrepStudent</h1>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                Reviews
              </a>
              
              <button 
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
              <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Reviews</a>
              <button 
                onClick={() => window.location.href = '/login'}
                className="block w-full text-left px-3 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="block w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <span className="mr-2">🚀</span>
                AI-Powered Learning Platform
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Master Any Subject with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Tutoring
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get personalized explanations, instant feedback, and interactive learning experiences 
                designed to help you excel in mathematics, science, literature, and beyond.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <span>🎓</span>
                  <span>Start Learning Free</span>
                </button>
               
              </div>
            </div>
             
            {/* Hero Image/Illustration */}
            <div className="mt-16 relative">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-gray-200 shadow-sm">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-xl">📊</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Math Problem Solving</h3>
                    <p className="text-sm text-gray-600">Step-by-step solutions with detailed explanations</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-xl">🧪</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Science Concepts</h3>
                    <p className="text-sm text-gray-600">Interactive explanations of complex theories</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-xl">📝</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Essay Writing</h3>
                    <p className="text-sm text-gray-600">Grammar, structure, and style improvements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to <span className="text-blue-600">Excel</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform adapts to your learning style and provides comprehensive support across all subjects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Why Choose <span className="text-blue-600">PrepStudent</span>?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Traditional learning methods often leave students feeling frustrated and confused. 
                PrepStudent bridges the gap with AI-powered personalized tutoring that adapts to your unique learning style.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700"><strong>24/7 Availability:</strong> Study whenever you want, wherever you are</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700"><strong>Personalized Learning:</strong> AI adapts to your pace and understanding level</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700"><strong>Comprehensive Support:</strong> From basic concepts to advanced topics</p>
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={() => navigate("/signup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Your Journey Today
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">👤</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                      <p className="text-sm text-gray-700">Can you help me understand quadratic equations?</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🤖</span>
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg px-3 py-2">
                      <p className="text-sm text-gray-700">Absolutely! Let's start with the basic form: ax² + bx + c = 0...</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">👤</span>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                      <p className="text-sm text-gray-700">That makes sense! Can you show me an example?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Students Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful learners who've transformed their academic journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center mt-4 space-x-1">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already excelling with PrepStudent's AI-powered tutoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/signup")}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started Free
            </button>
            
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">PS</span>
                </div>
                <h3 className="text-xl font-semibold">PrepStudent</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                AI-powered learning platform designed to help students excel in their academic journey 
                through personalized tutoring and interactive experiences.
              </p>
            </div>
            
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PrepStudent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;