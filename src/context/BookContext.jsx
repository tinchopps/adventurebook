import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * BookContext - Global state for book navigation
 */
const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [navigateToPage, setNavigateToPage] = useState(() => () => {});

  // Register the navigation function from Book component
  const registerNavigation = useCallback((navFunc, total) => {
    setNavigateToPage(() => navFunc);
    setTotalPages(total);
  }, []);

  // Navigate to a specific page by order number
  const goToPage = useCallback((pageOrder) => {
    if (navigateToPage) {
      navigateToPage(pageOrder);
    }
  }, [navigateToPage]);

  return (
    <BookContext.Provider value={{
      currentPage,
      setCurrentPage,
      totalPages,
      goToPage,
      registerNavigation
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};

export default BookContext;
