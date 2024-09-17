import { Header, Footer } from '@/components';
import { Content, AddNote } from '@/pages';
import { EPages } from '@/types';
import { useAppSelector } from '@/store';

const App = () => {
  const pages = useAppSelector((state) => state.pages);

  const currentPage = pages.currentPage;
  const hasHeaderEditBtn = currentPage === EPages.Content;

  return (
    <div className={'container'}>
      <Header withEditBtn={hasHeaderEditBtn} />
      {currentPage === EPages.Content && <Content />}
      {currentPage === EPages.AddNote && <AddNote />}
      <Footer />
    </div>
  );
};

export default App;
