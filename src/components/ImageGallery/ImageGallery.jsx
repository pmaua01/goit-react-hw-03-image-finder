import css from '../ImageGallery/ImageGallery.module.css';
export const ImageGallery = ({ children }) => {
  return <ul className={css.ImageGallery}>{children}</ul>;
};
