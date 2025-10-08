import Layout from "../../components/Layout/Layout";
import styles from "./Home.module.css";
import { FaChevronRight } from "react-icons/fa";
import { useState, useEffect,useContext } from "react";
import axios from "../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Router";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {user} =useContext(AppContext)

  const handleAskQuestion = () => {
    navigate("/post-question");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const response = await axios.get("/question/all-questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data);
        setQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Layout>
      <div className={styles.homeBody}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <button className={styles.askBtn} onClick={handleAskQuestion}>
            Ask Question
          </button>
          <button className={styles.askBtn}>
            <Link style={{textDecoration:"none",color:"white"}} to={"/ask-ai"}>Ask Gemini</Link>
          </button>
          <h3>
            Welcome: <span className={styles.username}>{user.username}</span>
          </h3>
        </div>

        {/* Question List */}
        <section className={styles.questionSection}>
          <h2>Questions</h2>

          {loading ? (
            <p>Loading questions...</p>
          ) : questions.length === 0 ? (
            <p>No questions yet.</p>
          ) : (
            questions?.map((q, i) => (
              <Link
                onClick={() => {
                  scrollTo({ top: 0, behavior: "smooth" });
                }}
                to={`/answers/${q.questionid}`}
                key={i}
                className={styles.questionCard}
              >
                <div className={styles.userInfo}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    alt="user"
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{q.username}</span>
                </div>

                {/* Added questionContent wrapper */}
                <div className={styles.questionContent}>
                  <p className={styles.questionText}>{q.title}</p>
                </div>

                <FaChevronRight className={styles.arrowIcon} />
              </Link>
            ))
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Home;
