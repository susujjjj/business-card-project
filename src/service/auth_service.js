import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
  login(providerName) {
    //providerName을 받아와서 구글인지 트위터인지 페북인지를 받아와서
    //new firebase.auth.GithubAuthProvider(); < - 공식문서에 있음
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }
}

export default AuthService;

// 사용자가 로그인하거나 로그아웃하거나 그 역할만 담당
