var firebaseConfig = {
    apiKey: "AIzaSyBgi_FB7cxiUnZ2WJraOsx_1LEj8dte14Q",
    authDomain: "evolocity-dash.firebaseapp.com",
    databaseURL: "https://evolocity-dash.firebaseio.com",
    projectId: "evolocity-dash",
    storageBucket: "evolocity-dash.appspot.com",
    messagingSenderId: "1039907104728",
    appId: "1:1039907104728:web:c51322a28dfe65412e74ad",
    measurementId: "G-MCL3EZQFG9"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var provider = new firebase.auth.GoogleAuthProvider();
var user = firebase.auth().currentUser;
var db = firebase.firestore();

var name, email, photoUrl, uid, emailVerified;

function FirebaseSignIn() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode + " " + errorMessage);
        // ...
    });
}

function FirebaseSignOut() {
    firebase.auth().signOut().then(function () {
        console.log("Signed Out");
        window.location.reload(true);
    }).catch(function (error) {
        // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;

            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });

            document.getElementById("UserImage").src = photoUrl;
            document.getElementById("UserName").innerHTML = name;
            document.getElementById("UserEmail").innerHTML = email;
            FirebaseWritePref(localStorage.CartName, localStorage.CartToken, true);
        }
    } else {
        // No user is signed in.
    }
});

function FirebaseWritePref(CartName, SpotifyToken, isLightMode) {
    db.collection("users").doc(uid).set({
            isLightMode: isLightMode,
            cartName: CartName,
            spotifyToken: SpotifyToken
        })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

function FirebaseDeleteUser() {
    user.delete().then(function () {
        db.collection("users").doc(uid).delete().then(function () {
            console.log("User and Data successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }).catch(function (error) {
        // An error happened.
    });
}