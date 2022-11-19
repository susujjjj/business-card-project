import { firebaseDatabase } from './firebase';
class CardRepository {
  syncCards(userId, onUpdate) {
    //data가업뎃될때마다 하고싶은것을 콜백으로
    const ref = firebaseDatabase.ref(`${userId}/cards`);
    ref.on('value', (snapshot) => {
      const value = snapshot.val();
      // console.log(value, 'snapshot.val() value??');
      value && onUpdate(value); // value는 곧 maker.jsx의 useEffect cardRepository.syncCard 두번째인자인 cards입니다
      //firebase에서 해당 경로에 데이터가 계속 업뎃 될때마다, 업뎃된다면, 이 스냅샷에 벨류가 설정되어있다면
      //우리가 두번째 인자로 전달받은콜백함수를 계속 호출해줄거다
      //그리고 정말 중요한것은. 이 함수는 계속 싱크되는것을 끌 수 있는 함수를 리턴할거에요
    });
    //그래서 이 syncCards라는 함수를 호출하면 자동으로 싱크로나이지에이션이 발생하면서
    //해당하는 업데이트가 있으면 onUpdate를 호출해줄거고, 더이상 on을 하고 싶지 않으면
    //내가 이 함수를 리턴해줄테니까 이 함수를 호출해. 이 함수는 그냥 간단하게 ref를 이용해서 끄면된다
    return () => ref.off();
  }
  saveCard(userId, card) {
    // console.log(userId, 'userId?');
    // console.log(firebaseApp.database(), 'firebaseApp.database()?');
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).set(card);
  }

  removeCard(userId, card) {
    firebaseDatabase.ref(`${userId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;

// import firebaseApp from './firebase';

// class CardRepository {
//   syncCards(userId, onUpdate) {
//     //data가업뎃될때마다 하고싶은것을 콜백으로
//     const ref = firebaseApp.database().ref(`${userId}/cards`);
//     ref.on('value', (snapshot) => {
//       const value = snapshot.val();
//       console.log(value, 'snapshot.val() value??');
//       value && onUpdate(value); // value는 곧 maker.jsx의 useEffect cardRepository.syncCard 두번째인자인 cards입니다
//       //firebase에서 해당 경로에 데이터가 계속 업뎃 될때마다, 업뎃된다면, 이 스냅샷에 벨류가 설정되어있다면
//       //우리가 두번째 인자로 전달받은콜백함수를 계속 호출해줄거다
//       //그리고 정말 중요한것은. 이 함수는 계속 싱크되는것을 끌 수 있는 함수를 리턴할거에요
//     });
//     //그래서 이 syncCards라는 함수를 호출하면 자동으로 싱크로나이지에이션이 발생하면서
//     //해당하는 업데이트가 있으면 onUpdate를 호출해줄거고, 더이상 on을 하고 싶지 않으면
//     //내가 이 함수를 리턴해줄테니까 이 함수를 호출해. 이 함수는 그냥 간단하게 ref를 이용해서 끄면된다
//     return () => ref.off();
//   }
//   saveCard(userId, card) {
//     // console.log(userId, 'userId?');
//     // console.log(firebaseApp.database(), 'firebaseApp.database()?');
//     firebaseApp.database().ref(`${userId}/cards/${card.id}`).set(card);
//   }

//   removeCard(userId, card) {
//     firebaseApp.database().ref(`${userId}/cards/${card.id}`).remove();
//   }
// }

// export default CardRepository;
