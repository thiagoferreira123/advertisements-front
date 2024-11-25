// useFirebase.ts
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword, signOut, Unsubscribe, Auth } from 'firebase/auth';
import {
  getFirestore, query, where, onSnapshot,
  collection,
  addDoc,
  doc,
  deleteDoc,
  DocumentData,
  serverTimestamp,
  FieldValue,
} from 'firebase/firestore';

export interface LoginParams {
  email: string;
  token: string;
}

export interface FireStoreService {
  user: User | null,
  auth: Auth,
  // eslint-disable-next-line no-unused-vars
  login: (loginParams: LoginParams) => Promise<unknown>,
  logout: () => void,
  // eslint-disable-next-line no-unused-vars
  addMessage: (message: Message) => Promise<Message | false>,
  // eslint-disable-next-line no-unused-vars
  deleteMessage: (messageId: string) => Promise<boolean>,
  // eslint-disable-next-line no-unused-vars
  registerOnChangeListener: (id_paciente: number, callback: (data: Message[] | Message) => void) => Unsubscribe | undefined,
}

export type MessageType = "text" | "text/csv" | "application/pdf" | "text/plain" | "doc" | "ms-doc" | "msword" | "vnd.openxmlformats-officedocument.wordprocessingml.document" | "vnd.oasis.opendocument.text" | "mspowerpoint" | "powerpoint" | "vnd.ms-powerpoint" | "x-mspowerpoint" | "vnd.openxmlformats-officedocument.presentationml.presentation" | "excel" | "vnd.ms-excel" | "x-excel" | "x-msexcel" | "vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "image/png" | "image/jpeg" | "image/jpg" | "image/svg+xml" | "image/gif" | "image";

export interface FieldValueTimestamp {
  nanoseconds: number;
  seconds: number;
}

export interface Message {
  id?: string;
  content: string;
  id_paciente: string;
  message_type: MessageType,
  is_profissional: boolean;
  date?: FieldValue | FieldValueTimestamp;
}

const FIRESTORE_ROOT_COLLECTION = "OdontCloud-chat";
const FIRESTORE_MESSAGE_COLLECTION = "messages";

const firebaseConfig = {
  apiKey: 'AIzaSyBr7Hs2VzW69_QqJSV4-8EbN5QhmV8sxsY',
  authDomain: 'OdontCloud-24735.firebaseapp.com',
  projectId: 'OdontCloud-24735',
  // storageBucket: 'dt-chat-68bac.appspot.com',
  // messagingSenderId: '263281938524',
  // appId: '1:263281938524:web:29d77a60d601967daf9699',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let isFirstSnapshot = true;
let unsubscribe: Unsubscribe;

const useFirebase = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);

    return () => unsubscribe();
  }, []);

  const login = async (loginParams: LoginParams) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user);
          resolve(true);
        } else {
          signInWithEmailAndPassword(auth, loginParams.email, loginParams.token).then((userCredential) => {
            setUser(userCredential.user);
            resolve(true);
          }).catch((error) => reject(error));
        }
      })
    })
  };

  const logout = () => {
    try {
      signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Falha ao deslogar: ", error);
      throw error;
    }
  };

  const addMessage = async (message: Message) => {
    try {
      if (!user) { console.error('User is not defined'); return false }

      message.date = serverTimestamp();

      const collection_ = collection(db, FIRESTORE_ROOT_COLLECTION, user.uid, FIRESTORE_MESSAGE_COLLECTION);

      const docRef = await addDoc(collection_, { ...message, type: 'text' });

      return (docRef as DocumentData)?.doc?.data() as Message ?? docRef;
    } catch (error) {
      console.error("Erro ao adicionar mensagem: ", error);
      throw error;
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      if (!user) { console.error('User is not defined'); return false }

      const collection_ = collection(db, FIRESTORE_ROOT_COLLECTION, user.uid, FIRESTORE_MESSAGE_COLLECTION);

      await deleteDoc(doc(collection_, messageId));

      return true;
    } catch (error) {
      console.error("Erro ao deletar mensagem: ", error);
      return false;
    }
  };

  // eslint-disable-next-line no-unused-vars
  const registerOnChangeListener = (id_paciente: number, callback: (data: Message[] | Message, type?: string) => void) => {
    if (!user) return;

    unsubscribe && unsubscribe();

    // Ajuste na construção da query
    const messagesRef = collection(db, FIRESTORE_ROOT_COLLECTION, user.uid, FIRESTORE_MESSAGE_COLLECTION);
    const q = query(messagesRef, where("id_paciente", "==", id_paciente.toString()));

    unsubscribe = onSnapshot(q, (snapshot) => {
      isFirstSnapshot = false;
      const changes = snapshot.docChanges();

      if (isFirstSnapshot) {
        callback(changes.map(change => ({ ...change.doc.data() as Message, id: change.doc.id })));
      } else {
        changes.forEach((change) => {
          const message = { ...change.doc.data() as Message, id: change.doc.id }
          message.date && callback(message, change.type)
        });
      }
    });

    return unsubscribe; // Retorna a função de unsubscribe

  };

  return { user, auth, login, logout, addMessage, deleteMessage, registerOnChangeListener };
};

export default useFirebase;
