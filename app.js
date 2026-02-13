// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 ضع بياناتك هنا
const firebaseConfig = {
    apiKey: "AIzaSyDI1vzdq--ELAVncdphz_iCsfNA8l5lvCU",
  authDomain: "cloud-notes-system.firebaseapp.com",
  projectId: "cloud-notes-system",
  storageBucket: "cloud-notes-system.firebasestorage.app",
  messagingSenderId: "1009164093092",
  appId: "1:1009164093092:web:6e3f9f722a756f19d30831"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register
window.register = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await createUserWithEmailAndPassword(auth, email, password);
    alert("User Registered!");
}

// Login
window.login = async function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged In!");
}

// Logout
window.logout = async function() {
    await signOut(auth);
}

// Add Note
window.addNote = async function() {
    const user = auth.currentUser;
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await addDoc(collection(db, "notes"), {
        title,
        content,
        userId: user.uid,
        createdAt: new Date()
    });
}

// Listen Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("notes-section").style.display = "block";
        loadNotes(user.uid);
    } else {
        document.getElementById("notes-section").style.display = "none";
    }
});

// Load Notes Realtime
function loadNotes(uid) {
    const q = query(collection(db, "notes"), where("userId", "==", uid));
    onSnapshot(q, (snapshot) => {
        const notesList = document.getElementById("notes-list");
        notesList.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            notesList.innerHTML += `
                <div>
                    <h3>${data.title}</h3>
                    <p>${data.content}</p>
                </div>
            `;
        });
    });
}
