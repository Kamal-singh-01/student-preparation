import React, { useState } from "react";
import Navbar from "./Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

const ExamPage = () => {
  const [subject, setSubject] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!subject || !numQuestions) {
      toast.error("Please enter a subject and a number of questions.");
      return;
    }
    setQuestions([]);
    setShowResults(false);
    setScore(null);

    try {
      setLoading(true);
      const res = await api.post("/generate", { subject, numQuestions });
      const newQuestions = res.data.questions.map((q) => ({
        ...q,
        userAnswer: "", // Initialize user answer
      }));
      setQuestions(newQuestions);
      toast.success("Test generated successfully!");
    } catch (err) {
      console.error("Error generating test:", err);
      toast.error("Failed to generate test. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (index, answer) => {
    const updated = [...questions];
    updated[index].userAnswer = answer;
    setQuestions(updated);
  };

  const handleSubmitTest = async () => {
    // Check if all questions have been answered
    const allAnswered = questions.every((q) => q.userAnswer !== "");
    if (!allAnswered) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      const res = await api.post("/check-answers", { questions });
      setScore(res.data.score);
      setTotal(res.data.total);
      setShowResults(true);
      toast.success("Test submitted! Check your score below.");
    } catch (err) {
      console.error("Error checking answers:", err);
      toast.error("Failed to submit test. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span role="img" aria-label="Clipboard emoji" className="text-white text-xl">
                📝
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Create a New Test</h1>
          </div>
          <p className="text-gray-600 mb-6">
            Generate a custom practice test to reinforce your knowledge.
          </p>

          <form className="space-y-4" onSubmit={handleGenerate}>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Physics, History, Algebra"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Questions (1-10)
              </label>
              <input
                id="numQuestions"
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                min="1"
                max="10"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
 
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-4 py-3 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Test"}
            </button>
          </form>
        </div>

        {questions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Test</h2>
            {questions.map((q, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <p className="font-semibold text-lg mb-4">
                  <span className="text-blue-600 mr-2">{i + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-3">
                  {q.options.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`block p-4 rounded-lg cursor-pointer transition-colors duration-200
                        ${
                          showResults && opt === q.answer
                            ? "bg-green-100 border-2 border-green-500"
                            : showResults && opt === q.userAnswer && opt !== q.answer
                            ? "bg-red-100 border-2 border-red-500"
                            : "bg-gray-100 hover:bg-gray-200"
                        }
                        ${
                          !showResults && q.userAnswer === opt && "bg-blue-100 border-2 border-blue-500"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`question-${i}`}
                        value={opt}
                        checked={q.userAnswer === opt}
                        onChange={() => handleAnswerChange(i, opt)}
                        disabled={showResults}
                        className="mr-3 accent-blue-600"
                      />
                      <span className="text-gray-700 font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
                {showResults && (
                  <p className="mt-4 text-sm font-medium">
                    <span className="text-green-600">Correct Answer:</span> {q.answer}
                  </p>
                )}
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleSubmitTest}
                disabled={showResults}
                className="bg-green-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Test
              </button>
              {showResults && score !== null && (
                <div className="text-xl font-bold p-4 rounded-lg bg-white border border-gray-300 shadow">
                  Your Score: <span className="text-blue-600">{score} / {total}</span>
                </div> 
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamPage;