import { Circles } from 'react-loader-spinner';
import css from '../Spinner/Spinner.module.css';

export const Spinner = () => {
  console.log(css.Spinner);
  return <Circles wrapperClass={css.Spinner}></Circles>;
};
