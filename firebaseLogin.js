import { useState, useEffect } from "react";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function firebaseLogin() {
const [init, setInit] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
if (user) {
setIsLoggedIn(true);
const uid = user.uid;
} else {
setIsLoggedIn(false);
}
setInit(true);
});
}, []);
return ;
};

export default firebaseLogin;
