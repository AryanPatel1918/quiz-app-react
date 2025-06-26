import { useState, useRef } from 'react'
import questionsData from './questionsData'

export default function App() {

  const [questionIndex, setQuestionIndex] = useState(0)
  const correctAnswers = useRef(0)

  function checkAnswer(choice) {
    if (questionsData[questionIndex].answer === choice) {
      correctAnswers.current++
    }
    setQuestionIndex(prev => prev + 1)
  }

  
  return (
    questionIndex < questionsData.length ? (
      <div className="app-container">
        <h3>Question {questionIndex + 1}/{questionsData.length}</h3>
        <h2>{questionsData[questionIndex].question}</h2>
        <div className="options-container">
          {questionsData[questionIndex].options.map(option => 
            <button onClick={() => checkAnswer(option)}>{option}</button>
          )}
        </div>
      </div>
    ) : (
      <h2>Your Score: {correctAnswers.current}/{questionsData.length}</h2>
    )
    
  )
}


