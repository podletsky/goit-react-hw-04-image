import React, { useState, useEffect } from 'react';
import { fetchPicture } from '../api/Api.js';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from '../components/imageGallery/ImageGallery.js';
import ButtonLoadMore from '../components/button/Button.js';
import CustomProgressBar from './loader/Loader.js';
import styles from '../components/App..module.css';

const App = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!searchValue) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchPicture(searchValue, page);
        const newImages = response.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        if (newImages.length === 0) {
          return;
        }

        setImages(prevImages => [...newImages, ...prevImages]);
        setTotalImages(response.totalHits);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, searchValue]);

  const handleSearch = searchValue => {
    setPage(1);
    setImages([]);
    setSearchValue(searchValue);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    searchValue(image);
  };
  const showButton = !loading && images.length !== totalImages;
  return (
    <div className={styles.container}>
      <Searchbar onSubmit={handleSearch} />
      <div className="imageGallery">
        <ImageGallery images={images} onClick={handleImageClick} />
      </div>
      {showButton && <ButtonLoadMore buttonLoadMore={handleLoadMore} />}
      {loading && <CustomProgressBar />}
    </div>
  );
};

export { App };
