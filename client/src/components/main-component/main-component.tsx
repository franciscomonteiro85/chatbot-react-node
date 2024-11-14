import { MainContent } from '../content/main.content';
import { Header } from '../header/header';
import classes from './styles.module.css';

export const MainComponent = () => {
  return (
    <div className={classes.mainComponent}>
      <Header />
      <MainContent />
    </div>
  );
};
