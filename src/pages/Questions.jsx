import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

import topBlobsSmall from "../assets/images/blobs-top-small.png";
import bottomBlobsSmall from "../assets/images/blobs-bottom-small.png";

export default function Questions() {
  const [data, setData] = React.useState(null);
  const [quiz, setQuiz] = React.useState([]);
  const questionsObj = {
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
  };
  const [formData, setFormData] = React.useState(questionsObj);
  const [isReview, setIsReview] = React.useState(false);
  const [btnMsg, setBtnMsg] = React.useState("Check Answers");
  const [counter, setCounter] = React.useState(0);

  function getData() {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (data) {
      data.map((item) => {
        const question = decode(item.question);
        const correct_answer = decode(item.correct_answer);
        let answerOptions = [];
        if (item.type === "boolean") {
          answerOptions = ["True", "False"];
        } else {
          answerOptions = item.incorrect_answers.map((answer) =>
            decode(answer)
          );
          answerOptions.splice(Math.ceil(Math.random() * 3), 0, correct_answer);
        }
        setQuiz((prevQuiz) => [
          ...prevQuiz,
          {
            question: question,
            answers: answerOptions,
            correctAnswer: correct_answer,
          },
        ]);
      });
    }
  }, [data]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const quizElements = quiz.map((element, index) => {
    return (
      <div key={nanoid(10)} className="question--tile">
        <div className="question">{element.question}</div>
        <div className="answers">
          {element.answers.map((answer) => {
            const check = formData[`question${index + 1}`] === answer;
            const choiceID = `${element.question}${answer}`;
            return (
              <div key={nanoid(5)} className="choice">
                <input
                  type="radio"
                  name={`question${index + 1}`}
                  value={answer}
                  id={choiceID}
                  checked={check}
                  onChange={handleChange}
                />
                <label
                  htmlFor={choiceID}
                  className={`
                  ${
                    isReview
                      ? element.correctAnswer === answer
                        ? "correct"
                        : check
                        ? "wrong"
                        : ""
                      : check
                      ? "selected"
                      : ""
                  }
                  `}
                >
                  {answer}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isReview) {
      quiz.map((item, index) => {
        if (item.correctAnswer === formData[`question${index + 1}`]) {
          setCounter((prevCounter) => prevCounter + 1);
        }
      });
      setIsReview(true);
      setBtnMsg("Play Again?");
    } else {
      getData();
      setQuiz([]);
      setFormData(questionsObj);
      setIsReview(false);
      setBtnMsg("Check Answers");
      setCounter(0);
    }
  }

  return (
    <section className="questions">
      <img src={topBlobsSmall} className="top" />
      <img src={bottomBlobsSmall} className="bottom" />
      <form className="questions--container">
        {quizElements}
        {isReview && (
          <p className="reviewMsg">You scored {counter}/10 correct answers</p>
        )}
        <button onClick={handleSubmit}>{btnMsg}</button>
      </form>
    </section>
  );
}
