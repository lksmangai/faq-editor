import React, { useState, useEffect } from 'react';
import './FAQEditor.css';

const CategoryForm = ({ addCategory, editCategory, currentCategory }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentCategory) {
      setName(currentCategory.name);
    } else {
      setName('');
    }
  }, [currentCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if the name field is empty
    if (!name.trim()) {
      setError('Category name cannot be empty.');
      return;
    }

    if (currentCategory) {
      editCategory({ ...currentCategory, name });
    } else {
      addCategory({ id: Date.now(), name });
    }
    setName('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="faq-editor__container">
      <div className="faq-editor__category">
        <label className="faq-editor__question-label" htmlFor="category-name">
          Category Name:
        </label>
        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="faq-editor__input"
        />
        {error && <p className="faq-editor__error">{error}</p>}
      </div>
      <button type="submit" className={`faq-editor__button ${currentCategory ? 'faq-editor__save-button' : 'faq-editor__add-button'}`}>
        {currentCategory ? 'Edit Category' : 'Add Category'}
      </button>
    </form>
  );
};

export default CategoryForm;
