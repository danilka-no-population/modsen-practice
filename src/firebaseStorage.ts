import { getFirestore, collection, addDoc, query, where, getDocs, writeBatch} from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);


export const addFavoritePlace = async (userId: string, placeId: string) => {
    try {
        const userCollection = collection(db, userId);
        const q = query(userCollection, where("place_id", "==", placeId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log("Place with place_id already exists for user");
            return;
        }

        const data = {
            place_id: placeId
        };

        const docRef = await addDoc(userCollection, data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const getFavoritePlaces = async (userId: string) => {
    const userCollection = collection(db, userId);
    const querySnapshot = await getDocs(userCollection);
    const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return documents;
}

export const deleteFavoritePlace = async (userId: string, placeId : string) => {
    try {
        console.log(placeId)
        const userCollectionRef = collection(db, userId);
        const q = query(userCollectionRef, where('place_id', '==', placeId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const batch = writeBatch(db);
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            console.log("Document(s) deleted");
            return true;
        } else {
            console.log("No matching documents found");
            return false;
        }
    } catch (e) {
        console.error("Error deleting document: ", e);
        return false;
    }
};