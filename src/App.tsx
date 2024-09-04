import { useState } from 'react';
import { Header, Footer } from '@/components';
import { Content, AddNote } from '@/pages';
import { EPages } from '@/types';

const App = () => {
  const [currentPage, setCurrentPage] = useState<EPages>(EPages.Content);

  const setMainPage = (): void => {
    setCurrentPage(EPages.Content);
  };

  const setCreateNotePage = (): void => {
    setCurrentPage(EPages.AddNote);
  };

  return (
    <div className="container">
      <Header
        setMainPage={setMainPage}
        setCreateNotePage={setCreateNotePage}
        currentPage={currentPage}
      />
      {currentPage === EPages.Content && (
        <Content handleBtnClick={setCreateNotePage} />
      )}
      {currentPage === EPages.AddNote && (
        <AddNote handleBtnClick={setMainPage} />
      )}
      <Footer />
    </div>
  );
};

export default App;
