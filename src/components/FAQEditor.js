import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { loadFAQData, exportFAQData } from './FAQDataUtils';
import './FAQEditor.css';

const FAQEditor = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const editCategory = (updatedCategory) => {
    setCategories(categories.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
    ));
    setCurrentCategory(null);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
    setQuestions(questions.filter((question) => question.categoryId !== id));   
  };

  const selectCategory = (category) => {
    setCurrentCategory(category);
    setCurrentQuestion(null);   
  };

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const editQuestion = (updatedQuestion) => {
    setQuestions(questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    ));
    setCurrentQuestion(null);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));   
  };

  const selectQuestion = (question) => {
    setCurrentQuestion(question);    
  };


  const filteredQuestions = currentCategory
    ? questions.filter((q) => q.categoryId === currentCategory.id)
    : [];

  
  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === 'CATEGORY') {
      const reorderedCategories = Array.from(categories);
      const [removed] = reorderedCategories.splice(source.index, 1);
      reorderedCategories.splice(destination.index, 0, removed);
      setCategories(reorderedCategories);
    } else if (type === 'QUESTION') {
      const reorderedQuestions = Array.from(questions);
      const [removed] = reorderedQuestions.splice(source.index, 1);
      reorderedQuestions.splice(destination.index, 0, removed);
      setQuestions(reorderedQuestions);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        loadFAQData(data, setCategories, setQuestions);
      } catch (error) {
        alert('Failed to load file. Please ensure it is a valid JSON.');
      }
    };
    
    reader.readAsText(file);
  };
  
  const handleExport = () => {
    exportFAQData(categories, questions);
  };

  return (
    <div className="faq-editor">
      <h1 className="faq-editor__heading">FAQ Editor</h1>
      <div className="faq-editor__controls">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="faq-editor__file-input"
        />
        <button
          onClick={handleExport}
          className="faq-editor__button faq-editor__export-button"
        >
          Export
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories" type="CATEGORY">
          {(provided) => (
            <div
              className="faq-editor__category-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <CategoryForm
                addCategory={addCategory}
                editCategory={editCategory}
                currentCategory={currentCategory}
              />
              <CategoryList
                categories={categories}
                deleteCategory={deleteCategory}
                selectCategory={selectCategory}
                provided={provided}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {currentCategory && (
          <Droppable droppableId="questions" type="QUESTION">
            {(provided) => (
              <>
                <h2 className="faq-editor__category-heading">
                  Manage Questions in "{currentCategory.name}"
                </h2>
                <QuestionForm
                  addQuestion={addQuestion}
                  editQuestion={editQuestion}
                  currentQuestion={currentQuestion}
                  categoryId={currentCategory.id}
                />
                <div
                  className="faq-editor__questions"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <QuestionList
                    questions={filteredQuestions}
                    deleteQuestion={deleteQuestion}
                    selectQuestion={selectQuestion}
                    provided={provided}
                  />
                  {provided.placeholder}
                </div>
              </>
            )}
          </Droppable>
        )}        
      </DragDropContext>
    </div>    
  );
};

export default FAQEditor;
