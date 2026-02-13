// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 بياناتك
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

// عناصر HTML
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const noteForm = document.getElementById("notes-section");
const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");
const addBtn = document.getElementById("add-note");

// 🌟 Register
window.register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("User Registered!");
  } catch(err) {
    if(err.code === "auth/email-already-in-use") {
      alert("This email is already registered. Try logging in.");
    } else {
      alert(err.message);
    }
  }
}


// 🌟 Login
window.login = async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Logged In!");
    emailInput.value = "";
    passwordInput.value = "";
  } catch(err) { alert(err.message); }
}

// 🌟 Logout
window.logout = async () => {
  await signOut(auth);
}

// 🌟 Add Note
addBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const user = auth.currentUser;

  if(!user) return alert("You must be logged in!");
  if(!title || !content) return alert("Fill in both fields!");

  try {
    await addDoc(collection(db, "notes"), {
      title,
      content,
      userId: user.uid,
      createdAt: serverTimestamp()
    });
    titleInput.value = "";
    contentInput.value = "";
  } catch(err) { alert(err.message); }
});

// 🌟 Realtime Notes for Current User
onAuthStateChanged(auth, user => {
  if(user) {
    noteForm.style.display = "block";

    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    onSnapshot(q, snapshot => {
      notesList.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        notesList.innerHTML += `
          <div class="note-card">
            <h3>${data.title}</h3>
            <p>${data.content}</p>
          </div>
        `;
      });
    });

  } else {
    noteForm.style.display = "none";
    notesList.innerHTML = "";
  }
});
