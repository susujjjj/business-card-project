import React, { useEffect, useState, useCallback } from 'react';
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

  const onLogout = useCallback(() => {
    //이 Maker함수 안에서 지역변수로 만들어진 아이입니다
    //onLogout은 Maker 함수가 리렌더가 발생할때마다 계속해서 새로운 함수가 만들어지겠죠?
    //Maker라는 컴포넌트가 변경될때마다 계속해서 새로운 onLogout이 만들어지는 거에요 그래서 useCallback써줌
    authService.logout();
    //그러면 Maker함수가 새로 불려져도 여기 안에서는 한번 만들어진 함수만 계속 재사용한다는거임
  }, [authService]);

  //authService가 변경이 되어도 한번 저장된 예전의 authService를 사용하게된다는 말입니다.
  //이 useCallback은 업데이트되어도 계속 동일한걸 캐시를 이용해서 쓰는데, 대신에 내가 안에서 이용하고 있는
  //authService에 변화가 생긴다면, 다시 새로운 콜백을 만들거야 라고 전달해줘야되요

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
