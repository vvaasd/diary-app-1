import { useState } from 'react';
import { Header, Footer } from '@/components';
import { Content, AddNote } from '@/pages';
import { Pages } from '@/types';

const App = () => {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Content);

  const setMainPage = (): void => {
    setCurrentPage(Pages.Content);
  };

  const setCreateNotePage = (): void => {
    setCurrentPage(Pages.AddNote);
  };

  return (
    <div className="container">
      <Header
        setMainPage={setMainPage}
        setCreateNotePage={setCreateNotePage}
        currentPage={currentPage}
      />
      {currentPage === Pages.Content && (
        <Content handleBtnClick={setCreateNotePage} />
      )}
      {currentPage === Pages.AddNote && (
        <AddNote handleBtnClick={setMainPage} />
      )}
      <Footer />
    </div>
  );
};

export default App;
