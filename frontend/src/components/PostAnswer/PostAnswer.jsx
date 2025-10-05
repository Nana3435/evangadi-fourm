import Layout from "../Layout/Layout";
import classes from "./PostAnswer.module.css";
import { useRef, useState } from "react";
import axiosBase from "../../../axiosConfig";
const PostAnswer = ({ questionid }) => {
 const [error, setError] = useState(false);

  const answer = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answerValue = answer.current.value.trim();
   
  if (!answerValue) {
    setError(true);
    return;
  } else {
    setError(false);
  }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjQsInVzZXJuYW1lIjoibWVyb24iLCJpYXQiOjE3NTk2ODE0MDAsImV4cCI6MTc1OTc2NzgwMH0.8PjYU_IskYfny5ND-U5NqiipWKc5HezyfWUQU3FEUP0";
    try {
      const res = await axiosBase.post(
        "answer/post-answer",
        {
          questionid: questionid,
          answer: answerValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Answer posted successfully!", res.data);
      answer.current.value = "";
    } catch (error) {
      console.log(error.response || error.message);
    }
  };
  return (
    <>
      <div className={classes.answer_container}>
        <h2 className={classes.answer_title}>Answer The Top Question</h2>
        <a href="/" className={classes.question_link}>
          Go to Question page
        </a>
        <textarea
          ref={answer}
          className={`${classes.answer_textarea} ${error ? classes.error : ""}`}
          placeholder="Your Answer..."
        ></textarea>
        {error && (
          <small className={classes.error_text}>Please provide an answer</small>
        )}
        <button onClick={handleSubmit} className={classes.submit_btn}>
          Post Your Answer
        </button>
      </div>
    </>
  );
};

export default PostAnswer;
