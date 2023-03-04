import { cloud_db as db } from "./DatabaseService";

import { collection, query, where, getDocs, documentId } from "firebase/firestore";

export const test_query = async (ids) => {
    const q = query(collection(db, "cards"), where(documentId(), "in", ids));
    //const q = query(collection(db, "cards"), where("cmc", "==", 6));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}