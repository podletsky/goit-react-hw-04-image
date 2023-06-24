import styles from '../modal/Modal.module.css';
import { useEffect } from 'react';
const Modal = ({ image, closeModal, tags }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <img className={styles.modalImage} src={image} alt={tags} />
      </div>
    </div>
  );
};
export default Modal;
