import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './FAQEditor.css';

const CategoryList = ({ categories, deleteCategory, selectCategory, provided }) => {
  console.log("Droppable provided: ", provided, categories); // Debug log

  return (
    <div ref={provided.innerRef} {...provided.droppableProps} className="category-list">
      {categories.map((category, index) => (
        <Draggable key={`category-${category.id}`} draggableId={`category-${category.id}`} index={index}>        
          {(provided) => (
            <div
              className="list-item"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <h2 className="list-item__title">{category.name}</h2>
              <div className="list-item__actions">
                <button
                  onClick={() => selectCategory(category)}
                  className="faq-editor__button faq-editor__button--edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
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

export default CategoryList;
