import React from 'react'
import Layout from '../../components/Layout/Layout'
import QuestionDetail from '../../components/QuestionDetail/QuestionDetail'
import AnswersDetail from '../../components/AnswerDetail/AnswersDetail'
import PostQuestion from '../PostQuestion/PostQuestion'
import PostAnswer from '../../components/PostAnswer/PostAnswer'

const Answers = () => {
  return (
    <Layout>
        <QuestionDetail/>
        <AnswersDetail/>
        <PostAnswer/>
        
    </Layout>
  )
}

export default Answers