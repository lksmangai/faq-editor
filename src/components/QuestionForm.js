import React, { useState, useEffect, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import './FAQEditor.css';

const QuestionForm = ({ addQuestion, editQuestion, currentQuestion, categoryId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const editorRef = useRef(null); // Reference for the JoditEditor
  const config = useMemo(
    () => ({
        readonly: false, 
    }),
    []
  );
  useEffect(() => {
    if (currentQuestion) {
      setTitle(currentQuestion.title || '');
      setContent(currentQuestion.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus(); // Maintain focus when content changes
    }
  }, [content]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if the title and content fields are empty
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required.');
      return;
    }

    if (currentQuestion) {
      editQuestion({ ...currentQuestion, title, content });
    } else {
      addQuestion({ id: Date.now(), title, content, categoryId });
    }
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="faq-editor__container">
      <div className="faq-editor__question">
        <label className="faq-editor__question-label" htmlFor="question-title">
          Question Title:
        </label>
        <input
          id="question-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="faq-editor__input"
        />
      </div>
      <div className="faq-editor__answer">
        <label className="faq-editor__question-label" htmlFor="question-content">
          Question Content:
        </label>
        <JoditEditor
          ref={editorRef}
          value={content}
          onChange={newContent => setContent(newContent)}
          config={config}
          className="faq-editor__textarea"
        />
      </div>
      {error && <p className="faq-editor__error">{error}</p>}
      <button type="submit" className={`faq-editor__button ${currentQuestion ? 'faq-editor__save-button' : 'faq-editor__add-button'}`}>
        {currentQuestion ? 'Edit Question' : 'Add Question'}
      </button>
    </form>
  );
};

export default QuestionForm;
