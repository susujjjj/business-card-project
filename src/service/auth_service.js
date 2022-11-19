// import firebase from 'firebase';
import { firebaseAuth, githubProvider, googleProvider } from './firebase';

class AuthService {
  login(providerName) {
    //provider이름을 전달하면 해당하는 provider를 주는 함수를 만들거고여
    const authProvider = this.getProvider(providerName);
    //const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseAuth.signInWithPopup(authProvider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }
  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        //우리가 모르는 케이스가 온다면
        throw new Error(`not supported provider ${providerName}`);
    }
    //이름을 이용해서 provider를 리턴해줄거에요
  }
}

export default AuthService;
