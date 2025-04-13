import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
  updateDoc,
  getDoc,
  where,
  documentId,
  DocumentReference,
  Query,
  limit as limitItems,
  orderBy
} from "firebase/firestore";
import { Condition, Data } from "./types.js";
import { error } from "console";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9IUpplL0s0Mio7wVj0TjhsxEA_FaPmyE",
    authDomain: "unittest-83891.firebaseapp.com",
    projectId: "unittest-83891",
    storageBucket: "unittest-83891.firebasestorage.app",
    messagingSenderId: "321166335893",
    appId: "1:321166335893:web:b40f8da0b8fbccd9aea09c",
    measurementId: "G-0ZVN4SWJKM",
};

let app: any;
let fireStoreDB: any;

export const initializeFirebaseApp = () => {
    try{
        app = initializeApp(firebaseConfig);
        fireStoreDB = getFirestore();
        return app;
    }catch{
        console.error("Ошибка инициализации бд");
    }
};

export const uploadProcessedData = async (data: Data) => {
    const newId = uuidv4();
    data.id = newId;
    const document = doc(fireStoreDB, "newMenu", newId);
    let dataUpdated = await setDoc(document, data);
    return dataUpdated;
};

export const getTheDataById = async (documentId: string) => {
    try{
        const documentRef = doc(fireStoreDB, "newMenu");
        const docSnap = await getDoc(documentRef); 

        if (docSnap.exists()){
            return docSnap.data();
        } else {
            console.log(`Документ с ID ${documentId} не найден`);
            return null;
        }
    } catch (error) {
        console.error("Ошибка при получении документа: ", error);
        return null;
    }
}

export const getTheData = async () => {
    const collectionReference = collection(fireStoreDB, "newMenu");
    const finalData: any[] = [];
    const q = query(collectionReference);

    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
        finalData.push(doc.data());
    });
    return finalData;
};

export const getDataByPriceGreaterThan = async (minPrice: number) => {
    try{
        const collectionReference = collection(fireStoreDB, "newMenu");
        const finalData: any[] = [];
        const q = query(collectionReference, where("price", ">", minPrice));
    
        const docSnap = await getDocs(q);
        docSnap.forEach((doc) => {
            finalData.push(doc.data());
        });
        return finalData;
    } catch (error) {
        console.error("Ошибка при получении данных по цене: ", error);
        return[];
    }
};

export const deleteDataById = async(documentId: string) => {
    try {
        const documentRef = doc(fireStoreDB, "newMenu", documentId);
        await deleteDoc(documentRef);
        console.log(`Документ с ID ${documentId} был удален`, error);
    } catch (error){
        console.error("Ошибка при удалении документа:", error);
    }
}

export const updateDataById = async (documentId: string, updatedData: Data) => {
    try {
        const documentRef = doc(fireStoreDB, "newMenu", documentId);

        await updateDoc(documentRef, updatedData as Record<string, any>);
        console.log("Ошибка при обновлении документа:", error);
    } catch (error){
        console.error("Ошибка при обновлении документа: ", error);
    }
}

export const getFilteredMenuData = async ({
    operator,
    value,
    filterField,
    limit,
}: {
    operator: Condition;
    value: number | string;
    filterField: string;
    limit?: number;
}) => {
    try {
        const collectionReference = collection(fireStoreDB, "newMenu");
        let q: Query;

        q = query(collectionReference, where(filterField, operator, value));

        if (limit) {
            q = query(q, limitItems(limit));
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data() as Data);
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return [];
    }
};

export const getSortedMenuData = async ({
    sortField = "price",
    sortDirection = "asc",
    limit,
}: {
    sortField?: string;
    sortDirection?: "asc" | "desc";
    limit?: number; 
}) => {
    try {
        const collectionReference = collection(fireStoreDB,"newMenu");
        let q: Query;

        q = query(collectionReference, orderBy(sortField, sortDirection));

        if (limit) {
            q = query(q, limitItems(limit));
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => doc.data() as Data);
    } catch (error) {
        console.error("Ошибка при сортировке данных:", error);
        return [];
    }
};

export const getFireBaseApp = () => app;