import Layout from "../../components/Layout/Layout";
import styles from "./Home.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [questions, setQuestions] = useState([]);

  // Fetch questions from backend when the component loads
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions");

        setQuestions(response.data); // Assuming the backend returns an array
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []); // Empty dependency = runs once on mount

  return (
    <Layout>
      <div className={styles.homeBody}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <h3>
            Welcome: <span className={styles.username}>beti</span>
          </h3>
          <button className={styles.askBtn}>Ask Question</button>
        </div>

        {/* Question List */}
        <section className={styles.questionSection}>
          <h2>Questions</h2>

          {questions.length === 0 ? (
            <p>No questions yet.</p>
          ) : (
            questions.map((q, i) => (
              <div key={i} className={styles.questionCard}>
                <div className={styles.userInfo}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="user"
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{q.username}</span>
                </div>
                <p className={styles.questionText}>{q.text}</p>
                <FaChevronRight className={styles.arrowIcon} />
              </div>
            ))
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
