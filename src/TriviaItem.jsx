import Answer from "./Answer";
import { nanoid } from "nanoid";
import { decode } from "he";

export default function TriviaItem(props) {
  //   console.log(props);
  const answerElements = props.answers.map((item) => {
    return (
      <Answer
        question={props.question}
        answer={item.answer}
        isChosen={item.isChosen}
        isCorrect={item.isCorrect}
        displayResult={props.displayResult}
        key={nanoid()}
        chooseAnswer={props.chooseAnswer}
      />
    );
  });

  return (
    <div>
      <h3>{decode(props.question)}</h3>
      {answerElements}
    </div>
  );
}
