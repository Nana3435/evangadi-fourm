import { useEffect } from 'react';
import axios from '../../utils/axiosInstance.js'
import classes from "./QuestionDetail.module.css";
import { useState } from 'react';
import  {toast} from 'react-toastify'


const QuestionDetail = ({ questionid }) => {
  const [question, setQuestion] = useState({});
  const token= localStorage.getItem('token')

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const { data } = await axios.get(
          `/question/single-question/${questionid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(data)
        setQuestion(data.data)

      } catch (error) {
        console.log(error.response.data.error||error.message)
        toast.error(error.response.data.error || error.message);
      }
      
    };
    fetchAnswer();
  }, []);
  // console.log(question)

  return (
    <div className={classes.questionContainer}>
      <div className={classes.questionCard}>
        <h2 className={classes.questionTitle}>{question.title}</h2>
        <p className={classes.questionDescription}>{question.description}</p>

        <div className={classes.questionMeta}>
          <span className={classes.questionTag}>#{question.tag}</span>
          <span className={classes.questionUser}>
            Asked by <strong>{question.username}</strong>
          </span>
          <span className={classes.questionDate}>
            {new Date(question.created_at).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail