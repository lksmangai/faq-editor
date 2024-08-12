// QuestionList.js
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './FAQEditor.css';

const QuestionList = ({ questions, deleteQuestion, selectQuestion, provided }) => {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps} className="question-list">
      {questions.map((question, index) => (
        <Draggable key={`question-${question.id}`} draggableId={`question-${question.id}`} index={index}>
          {(provided) => (
            <div
              className="list-item"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h3 className="list-item__title">{question.title}</h3>
              <div className="list-item__actions">
                <button
                  onClick={() => selectQuestion(question)}
                  className="faq-editor__button faq-editor__button--edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteQuestion(question.id)}
                  className="faq-editor__button faq-editor__button--delete"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};

export default QuestionList;
