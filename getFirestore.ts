import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = collection(db, "users");

export async function getAllUsers() {
  try {
    const querySnapshot = await getDocs(docRef);

    if (querySnapshot.empty) {
      console.log('No users found in the "users" collection.');
      return;
    }

    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
