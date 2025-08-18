import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("userId");
        const res = await api.get(`/history/${userId}`);
        setHistory(res.data);
      } catch (error) {
        console.error("Error fetching history:", error);
        toast.error("Failed to load your chat history. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const truncateText = (text, maxWords = 10) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span role="img" aria-label="Books emoji" className="text-white font-semibold">📚</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Learning Hub</h2>
                <p className="text-xs text-gray-500">Your AI study companion</p>
              </div>
            </div>

            <Link to={"/chatbot"}>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200">
                <span className="flex items-center justify-center space-x-2">
                  <span>+</span>
                  <span>Start New Chat</span>
                </span>
              </button>
            </Link>
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span role="img" aria-label="Clock emoji" className="text-gray-400">🕒</span>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Recent Sessions</h3>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pointer-events-none">
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span role="img" aria-label="Thinking emoji" className="text-2xl">💭</span>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">No conversations yet</p>
                  <p className="text-gray-400 text-xs mt-1">Start chatting to see your history</p>
                </div>
              ) : (
                history
                  .filter((item) => item.messages && item.messages.length > 0)
                  .reverse()
                  .slice(0, 6)
                  .map((item) => (
                    <Link
                      key={item._id}
                      to={`/chat/${item._id}`}
                      className="group w-full text-left p-4 rounded-xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 block"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                          <span role="img" aria-label="Chat bubble emoji" className="text-blue-600 text-sm">💬</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900">
                            {truncateText(item.messages[0].text, 6)}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatDate(item.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <span role="img" aria-label="Waving hand emoji" className="text-3xl">👋</span>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                      Welcome back to{" "}
                      <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        PrepStudent
                      </span>
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Continue your learning journey with AI-powered tutoring
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-6">
                  <Link to={"/chatbot"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2">
                    <span>🚀</span>
                    <span>Start New Chat</span>
                  </Link>
                  <Link to={"/test"} className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border border-gray-300 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2">
                    <span>📝</span>
                    <span>Take a Test</span>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <span role="img" aria-label="Graduation cap emoji" className="text-4xl">🎓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* AI Tutoring Card */}
            <Link
              to="/chatbot"
              className="group text-left block p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span role="img" aria-label="Robot emoji" className="text-white text-xl">🤖</span>
                </div>
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span role="img" aria-label="Right arrow" className="text-blue-600 text-sm">→</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                AI Tutoring
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get personalized help with any subject. Ask questions and receive detailed explanations tailored to your learning style.
              </p>
            </Link>

            {/* Take Test Card */}
            <Link
              to="/exam"
              className="group text-left block p-6 bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300" 
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span role="img" aria-label="Test emoji" className="text-white text-xl">📝</span>
                </div>
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span role="img" aria-label="Right arrow" className="text-green-600 text-sm">→</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                Take Test
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Test your knowledge on different subjects with curated quizzes and instant feedback to track your learning progress.
              </p>
            </Link>

            {/* Progress Tracking Card */}
            <div className="p-6 bg-white rounded-2xl border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <span role="img" aria-label="Chart increasing emoji" className="text-white text-xl">📈</span>
                </div>
                <div className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                  Coming Soon
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Progress Tracking
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Track your learning achievements, review your study history, and monitor your improvement over time.
              </p>
            </div>
          </div>
 
          {/* Study Tips Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span role="img" aria-label="Lightbulb emoji" className="text-white text-lg">💡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Study Tips & Best Practices</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Use the sidebar to revisit previous conversations and build on past learning</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Ask specific, detailed questions to get the most comprehensive explanations</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Try different subjects - math, science, history, literature, and more</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Request examples and practice problems to reinforce your understanding</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
