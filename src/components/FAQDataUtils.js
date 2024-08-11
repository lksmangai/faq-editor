// faqDataUtils.js

// Load data from a JSON file
export const loadFAQData = (data, setCategories, setQuestions) => {
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
  export const exportFAQData = (categories, questions) => {
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
  