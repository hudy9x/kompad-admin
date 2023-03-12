 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
 importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyB5sIk3WGEdJtNGcJ5DnBXgXYlPzAmsr0k",
  authDomain: "kompad-a9b60.firebaseapp.com",
  projectId: "kompad-a9b60",
  storageBucket: "kompad-a9b60.appspot.com",
  messagingSenderId: "431772304435",
  appId: "1:431772304435:web:aafe5ce57f7954e4d88f46",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

