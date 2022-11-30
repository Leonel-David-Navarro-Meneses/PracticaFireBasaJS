// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, 
        onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbWF34ninZ4DEWC0YvsAKMAZD9479cox4",
    authDomain: "practicafirebasejs-8e170.firebaseapp.com",
    databaseURL: "https://practicafirebasejs-8e170-default-rtdb.firebaseio.com",
    projectId: "practicafirebasejs-8e170",
    storageBucket: "practicafirebasejs-8e170.appspot.com",
    messagingSenderId: "915416065471",
    appId: "1:915416065471:web:fc0360a6e12b2a08bc6d0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);

export const saveTask = (title, description, imageUrl) => addDoc(collection(db, 'tasks'), { title, description ,imageUrl});

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = callback => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
    (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //console.log('Upload is ' + progress + '% done');
   // document.querySelector('#progress').innterText = 'Upload is ' + progress + '% done';
    document.querySelector('#progress').value = progress ;
    },
    (error) => {
        // Handle unsuccessful uploads
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //document.querySelector('#progress').value = 'FIN!!!!!';   
        document.querySelector('#image').src = downloadURL; 
        console.log('File available at', downloadURL);
        });
    }
    );
}