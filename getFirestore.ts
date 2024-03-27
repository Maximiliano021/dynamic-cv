import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";
import { getFirestore, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { writeFile } from "ts-fs-promise";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = collection(db, "users");

export async function getAllUsers() {

  try {
    // Get a query snapshot of all documents in the collection
    const querySnapshot = await getDocs(docRef);

    // Check if there are any documents
    if (querySnapshot.empty) {
      console.log('No users found in the "users" collection.');
      return;
    }

    const users: any[] = [];

    // Process each document in the collection
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push(data);
    });

    return users

  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function saveData() {
  const users = await getAllUsers()

  // Convertir datosUserJson a una cadena JSON
  const cadenaJsonUserJson = JSON.stringify(users, null, 2); // Agregar sangría para mayor legibilidad
  await writeFile('datos.json', JSON.stringify(cadenaJsonUserJson, null, 2));
  // writeFile('hooola.json', JSON.stringify(cadenaJsonUserJson, null, 2))
}
