import React, { useRef, useState } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (e) => {
    setLoading(true);
    // console.log(e.target.files[0]);
    const uploaded = await imageUploader.upload(e.target.files[0]); //이것이 실행될때까지 기다렸다가, 완료되면 uploaded에 할당이 된다.
    setLoading(false);
    console.log(uploaded, 'uploaded');

    onFileChange({
      name: uploaded.original_filename, // 비뀐 파일의 이름
      url: uploaded.url,
    });
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading ? (
        <button
          className={`${styles.button} ${name ? styles.pink : styles.grey}`}
          onClick={onButtonClick}
        >
          {name || 'No file'}
        </button>
      ) : null}
      {loading ? <div className={styles.loading}></div> : null}
    </div>
  );
};

export default ImageFileInput;
