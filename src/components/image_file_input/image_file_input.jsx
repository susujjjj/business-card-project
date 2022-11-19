import React, { useRef } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
  const inputRef = useRef();

  const onButtonClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (e) => {
    // console.log(e.target.files[0]);
    const uploaded = await imageUploader.upload(e.target.files[0]); //이것이 실행될때까지 기다렸다가, 완료되면 uploaded에 할당이 된다.

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
      <button className={styles.button} onClick={onButtonClick}>
        {name || 'No file'}
      </button>
    </div>
  );
};

export default ImageFileInput;
