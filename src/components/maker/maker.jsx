import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
  const historyState = useHistory().state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);

  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();
  }, [userId, cardRepository]); //사용자의 id가 변경될때마다 쓸거애요
  //(cards) => {
  //   setCards(cards);
  // }
  //이 두번째인자인 콜백함수르 CardRepository 의 onUpdate로 들어감

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
        // console.log(userId);
      } else {
        history.push('/');
      }
    });
  }, [userId, authService, history]); //웬만하면 내가 쓰고있는 데이터가 변경될때만 이 아이들이 업뎃될수있도록 이렇게 디펜던시를 작성해주는게 좋음

  const createOrUpdateCard = (card) => {
    //console.log(card, 'car?d'); // 1번object만 가져옴
    setCards((cards) => {
      const updated = { ...cards };
      // console.log(updated, 'updated___');
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };
  // const addCard = (card) => {
  //   const updated = [...cards, card];
  //   setCards(updated);
  // };

  // const updateCard = (card) => {
  //   // const updated = [...cards, card];
  //   // setCards(updated);
  //   const updated = { ...cards }; // 기존에 있는 cards를 다 복사해와서
  //   // console.log(updated, '?updated===='); // {1:{}, 2:{}, 3:{}}
  //   // console.log(updated[card.id], '?updated[card.id]');
  //   updated[card.id] = card; //이제 update에 있는  id키를 이용해서 그 오브젝트 전체를 card로 변경해준다
  //   console.log(card, ' carD?');
  //   setCards(updated);
  // };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
