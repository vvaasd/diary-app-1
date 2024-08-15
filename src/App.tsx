import { useState } from 'react';
import { Header, Footer } from './components';
import { Content, AddNote } from './pages';

export enum CurrentPages {
  Content = 'content',
  AddNote = 'addNote',
}

const App = () => {
  const [currentPage, setCurrentPage] = useState<CurrentPages>(
    CurrentPages.Content
  );

  const setMainPage = (): void => {
    setCurrentPage(CurrentPages.Content);
  };

  const setCreateNotePage = (): void => {
    setCurrentPage(CurrentPages.AddNote);
  };

  return (
    <div className="container">
      <Header
        setMainPage={setMainPage}
        setCreateNotePage={setCreateNotePage}
        currentPage={currentPage}
      />
      {currentPage === CurrentPages.Content && (
        <Content handleBtnClick={setCreateNotePage} />
      )}
      {currentPage === CurrentPages.AddNote && (
        <AddNote handleBtnClick={setMainPage} />
      )}
      <Footer />
    </div>
  );
};

export default App;
