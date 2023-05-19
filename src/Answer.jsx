import { Decode } from "he";
import { decode } from "html-entities";

export default function Answer(props) {
  //   console.log(props);
  const styles = {
    backgroundColor:
      props.isChosen && props.displayResult === false
        ? "#D6DBF5"
        : props.displayResult && props.isCorrect
        ? "#94D7A2"
        : props.displayResult && props.isCorrect === false && props.isChosen
        ? "#F8BCBC"
        : "",
  };

  return (
    <div
      className={props.answer ? "answer" : ""}
      style={styles}
      onClick={() => props.chooseAnswer(props.answer, props.question)}
    >
      <p>{decode(props.answer)}</p>
    </div>
  );
}
