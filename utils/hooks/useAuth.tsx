import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { auth, db } from "../../config/firebase";
import firebase from "firebase";
import nookies from 'nookies'

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}> {props.children} </Provider>;
}

export const useAuth: any = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, []);

  const createUser = (user) => {
    const {password,...userdata} = user
    return db
      .collection("users")
      .doc(user.uid)
      .set(userdata)
      .then(() => {
        setUser(userdata);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification();
        return createUser({ uid: response.user.uid, email, name });
      })
      .catch((error) => {
        return { error };
      });
  };
  const signIn = ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        getUserAdditionalData(user);
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const getUserAdditionalData = (user: firebase.User) => {
    return db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((userData) => {
        const data = userData.data()
        if (data) {
          setUser(data);
          nookies.set(undefined, 'userData',JSON.stringify(user))
        }
      });
  };

  const getUserAdditionalDataOnUID = (uid) =>{
    db
    .collection("users")
    .doc(uid)
    .get()
    .then((userData) => {
      const data = userData.data()
      if (data) {
        return data;
        // setUser(data);
        // nookies.set(undefined, 'userData',JSON.stringify(user))
      }
    });
  }

  const changeUserEmail = (user: firebase.User,newEmail) => {
    return db
      .collection("users")
      .doc(user.uid)
      .update({email:newEmail})
  };


  const handleAuthStateChanged = (user: firebase.User) => {
    setUser(user);
    if (user) {
      getUserAdditionalData(user);
    }
  };

  const signOut = () => {
    return auth.signOut().then(() => setUser(false));
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
     return response;
    });
  };

  const changeEmailAddress = (oldEmail, newEmail, password) => {
    return auth.signInWithEmailAndPassword(oldEmail,password)
    .then((response) => {
      response.user.updateEmail(newEmail);
      changeUserEmail(user,newEmail);
    })
    .catch((error) => {
      return { error };
    });
  };


  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    changeEmailAddress,
    getUserAdditionalDataOnUID,
  };
};
