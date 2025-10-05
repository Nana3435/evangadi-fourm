import React from 'react'
import Layout from '../../components/Layout/Layout'
import QuestionDetail from '../../components/QuestionDetail/QuestionDetail'
import AnswersDetail from '../../components/AnswerDetail/AnswersDetail'
import PostQuestion from '../PostQuestion/PostQuestion'
import PostAnswer from '../../components/PostAnswer/PostAnswer'
import { useParams } from 'react-router-dom'

const Answers = () => {
 const { questionid } = useParams();
  return (
    <Layout>
      <QuestionDetail />
      <AnswersDetail />
      <PostAnswer questionid={questionid} />
    </Layout>
  );
}

export default Answers