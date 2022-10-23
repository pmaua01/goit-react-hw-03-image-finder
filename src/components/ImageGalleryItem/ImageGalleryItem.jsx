import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ answerFromApi, onItemClick }) => {
  return answerFromApi.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li
        className={css.ImageGalleryItem}
        key={id}
        onClick={() => onItemClick(largeImageURL)}
      >
        <img
          className={css.ImageGalleryItem__image}
          src={webformatURL}
          alt=""
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  answerFromApi: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
  onItemClick: PropTypes.func,
};
