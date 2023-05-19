import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { nanoid } from "nanoid";
import { shuffle } from "./utils";
import Intro from "./Intro";
import TriviaItem from "./TriviaItem";

function App() {
  const [start, setStart] = useState(false);
  const [trivia, setTrivia] = useState([]);
  const [score, setScore] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);
  const [replay, setReplay] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  const [formData, setFormData] = useState({
    numOfQuestions: 5,
    category: "",
    difficulty: "",
  });

  // console.log(formData);

  useEffect(() => {
    getTrivia();
  }, [start]);

  function getTrivia() {
    fetch(
      `https://opentdb.com/api.php?amount=${formData.numOfQuestions}&category=${formData.category}&difficulty=${formData.difficulty}`
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = data.results.map((item) => {
          return {
            id: nanoid(),
            question: item.question,
            answers: shuffle([
              { answer: item.correct_answer, isCorrect: true, isChosen: false },
              {
                answer: item.incorrect_answers[0],
                isCorrect: false,
                isChosen: false,
              },
              {
                answer: item.incorrect_answers[1],
                isCorrect: false,
                isChosen: false,
              },
              {
                answer: item.incorrect_answers[2],
                isCorrect: false,
                isChosen: false,
              },
            ]),
          };
        });
        setTrivia(newData);
      });
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleStart() {
    setStart(true);
  }

  function chooseAnswer(value, question) {
    let tempQuestionsGroup = trivia.map((triviaItems) => {
      if (triviaItems.question === question) {
        let tempChoicesGroup = triviaItems.answers.map((result) => {
          return result.answer === value
            ? { ...result, isChosen: true }
            : { ...result, isChosen: false };
        });
        return {
          ...triviaItems,
          answers: tempChoicesGroup,
        };
      } else {
        return triviaItems;
      }
    });
    setTrivia(tempQuestionsGroup);
  }

  function handleResult() {
    let tempscore = 0;
    let tempCount = 0;
    trivia.map((item) => {
      item.answers.map((answer) => {
        if (answer.isChosen && answer.isCorrect) {
          tempscore++;
          tempCount++;
        } else if (answer.isChosen) {
          tempCount++;
        }
      });
      setScore(tempscore);
      setAnswerCount(tempCount);
    });
  }

  useEffect(() => {
    if (answerCount === Number(formData.numOfQuestions)) {
      setDisplayResult(true);
      setReplay(true);
    }
  }, [answerCount, formData.numOfQuestions]);

  function handleReplay() {
    setScore(0);
    setAnswerCount(0);
    setDisplayResult(false);
    setReplay(false);
    getTrivia();
  }

  const questionElements = trivia.map((item) => {
    return (
      <TriviaItem
        key={nanoid()}
        question={item.question}
        answers={item.answers}
        chooseAnswer={chooseAnswer}
        displayResult={displayResult}
      />
    );
  });

  return (
    <div className="container">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className={darkMode ? "dark" : ""}>
        {!start ? (
          <Intro
            handleStart={handleStart}
            handleChange={handleChange}
            numOfQuestions={formData.numOfQuestions}
            category={formData.category}
            difficulty={formData.difficulty}
            darkMode={darkMode}
          />
        ) : (
          <div>
            {questionElements}
            {displayResult && (
              <h3>
                You scored {score}/{formData.numOfQuestions} correct answers
              </h3>
            )}
            {!replay ? (
              <button
                onClick={handleResult}
                className={darkMode ? "dark btn-check-res" : "btn-check-res"}
              >
                Check Result
              </button>
            ) : (
              <button onClick={handleReplay} className={darkMode ? "dark" : ""}>
                Replay
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

// const questionElements = trivia.map((item, index) => (
//   <div key={index}>
//     <h3>{decode(item.question)}</h3>
//     {item.answers.map((item) => {
//       return (
//         <span
//           key={nanoid()}
//           className={item.answer ? "answer" : ""}
//           onClick={() => chooseAnswer(item.answer)}
//         >
//           {item.answer}
//         </span>
//       );
//     })}
//     <hr />
//   </div>
// ));
