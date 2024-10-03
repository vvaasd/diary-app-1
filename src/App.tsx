import { Header, Footer } from '@/components';
import { Content, AddNote } from '@/pages';
import { PagesEnum } from '@/types';
import { useAppSelector } from '@/store';

const App = () => {
  const currentPage = useAppSelector((state) => state.page.currentPage);

  const hasHeaderEditBtn = currentPage === PagesEnum.Content;

  return (
    <div className={'container'}>
      <Header withEditBtn={hasHeaderEditBtn} />
      {currentPage === PagesEnum.Content && <Content />}
      {currentPage === PagesEnum.AddNote && <AddNote />}
      <Footer />
    </div>
  );
};

export default App;
