// faqDataUtils.js
// Load data from a JSON file
export const loadFAQData = (data, setCategories, setQuestions) => {
  // Initialize ID counters
  let categoryIdCounter = 0;
  let questionIdCounter = 0;

  const loadedCategories = [];
  const loadedQuestions = [];

  // Iterate over each category in the input data
  Object.keys(data).forEach(categoryName => {
      const categoryId = categoryIdCounter++;
      const questions = data[categoryName];

      // Add category to loaded categories
      loadedCategories.push({
          id: categoryId,
          name: categoryName
      });

      // Iterate over each question in the category
      questions.forEach(question => {
          const questionId = question.id !== undefined ? question.id : questionIdCounter++;
          loadedQuestions.push({
              id: questionId,
              ...question,
              categoryId: categoryId
          });
      });
  });

  setCategories(loadedCategories);
  setQuestions(loadedQuestions);
};
// Export data as a JSON file
export const exportFAQData = (categories, questions) => {
  const data = categories.reduce((acc, category) => {
      const categoryQuestions = questions
          .filter(question => question.categoryId === category.id)
          .map(({ categoryId, ...rest }) => rest); // Remove categoryId

      acc[category.name] = categoryQuestions;
      return acc;
  }, {});

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'faq-data.json';
  link.click();
  URL.revokeObjectURL(url);
};

// Load data from a JSON file
export const loadFAQDataOld = (data, setCategories, setQuestions) => {
    // Initialize ID counters
    let categoryIdCounter = Math.max(...(data.map(c => c.id) || [0])) + 1;
    let questionIdCounter = Math.max(...(data.flatMap(c => c.questions ? c.questions.map(q => q.id || 0) : [])) || [0]) + 1;
    
    const loadedCategories = [];
    const loadedQuestions = [];
   
  
    data.forEach(category => {
      const id = category.id || categoryIdCounter++;
      const { questions, ...otherCategoryProperties } = category;
      loadedCategories.push({ id, ...otherCategoryProperties });
      
      if (Array.isArray(questions)) {
        questions.forEach(question => {
          const questionId = question.id || questionIdCounter++;
          const { ...otherQuestionProperties } = question;
          loadedQuestions.push({ id: questionId, ...otherQuestionProperties, categoryId: id });
        });
      }
    });
  
    setCategories(loadedCategories);
    setQuestions(loadedQuestions);
    
  };
  
  // Export data as a JSON file
  export const exportFAQDataOld = (categories, questions) => {
    const data = categories.map(category => ({
      ...category,
      questions: questions
        .filter(question => question.categoryId === category.id)
        .map(question => ({
          ...question
        }))
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'faq-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  