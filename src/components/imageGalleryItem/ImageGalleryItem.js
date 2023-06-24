import React, { useState } from 'react';
import styles from '../imageGalleryItem/imageGalleryItem.module.css';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';

const GalleryItem = ({ image, modalOpen }) => {
  const [modalOpenState, setModalState] = useState(false);

  const openModalFunc = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      <li className={styles.item} onClick={openModalFunc}>
        <img
          className={styles.image}
          src={image.webformatURL}
          alt={image.tags}
          width={200}
        />
      </li>
      {modalOpenState && (
        <Modal image={image.largeImageURL} closeModal={closeModal} />
      )}
    </>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default GalleryItem;
