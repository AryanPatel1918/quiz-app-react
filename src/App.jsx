import { useState, useRef } from 'react'
import questionsData from './questionsData'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export default function App() {

  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState("")
  const correctAnswers = useRef(0)
  const { width, height } = useWindowSize()

  function clickOption(option) {
    if (!selected) {
      setSelected(option)
      if (questionsData[questionIndex].answer === option) {
        correctAnswers.current++
      }
    }
  }

  function nextQuestion() {
    setSelected("")
    setQuestionIndex(index => index + 1)
  }
  
  return (
    questionIndex < questionsData.length ? (
      <div className="app-container">
        <h3>Question {questionIndex + 1}/{questionsData.length}</h3>
        <h2>{questionsData[questionIndex].question}</h2>
        <div className="options-container">
          {questionsData[questionIndex].options.map((option, index) => 
            <button
              style={{
                backgroundColor: selected
                  ? option === questionsData[questionIndex].answer
                    ? "hsl(140, 88.40%, 40%)"
                    : option === selected
                    ? "hsl(0, 87.40%, 47%)"
                    : ""
                  : ""
              }}
              key={index}
              onClick={() => clickOption(option)}
              disabled={!!selected}
            >
              {option}
            </button>
          )}
        </div>
        
        {!!selected && 
          <button
            className="next-btn"
            onClick={nextQuestion}
            >
              {questionIndex < questionsData.length - 1 ? "Next ➡️" : "See score"}
          </button>
        }
      </div>
    ) : (
      <>
        <h2 style={{ marginTop: "50px"}}>
          Your Score: <span style={{ color: (correctAnswers.current / questionsData.length) > 0.7 ? "hsl(140, 88.40%, 40%)" : "hsl(0, 87.40%, 47%)" }}>{correctAnswers.current} / {questionsData.length}</span>
        </h2>
        {(correctAnswers.current / questionsData.length > 0.7) &&
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            gravity={0.2}
          />
        }
      </>
    )
    
  )
}


