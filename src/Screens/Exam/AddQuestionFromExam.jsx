import React from 'react'
import AddQuestion from '../Question/AddQuestion'

const AddQuestionFromExam = ({topicId}) => {
  return (
    <div>
      <AddQuestion topicId={topicId}/>
    </div>
  )
}

export default AddQuestionFromExam
