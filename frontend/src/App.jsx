import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import HomePage from './components/HomePage'
import ChatBot from './components/ChatBot'
import ExamPage from './components/ExamPage'
 
function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<LandingPage />} />
      <Route path='/homepage' element={<HomePage />} />
      <Route path='/chatbot' element={<ChatBot />} />
      <Route path='/exam' element={<ExamPage />} />
    </Routes>
  )
}

export default App