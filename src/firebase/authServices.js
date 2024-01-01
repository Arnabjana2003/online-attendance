import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { auth } from "./firebase.config";
import services from "./services";

class AuthServices{
    
    async signup(email,passcode){
        try {
            return await createUserWithEmailAndPassword(auth, email, passcode)
        } catch (error) {
            throw error.message
        }
       return null
    }
    async login(email,passcode){
        const userCredential = await signInWithEmailAndPassword (auth, email, passcode)
        return userCredential.user;
    }
    async logout(){
        return await signOut(auth)
    }
    async getCurrentUser(user){
    //    onAuthStateChanged(auth,user)
    return auth.currentUser
    }
}

const authServices = new AuthServices()
export default authServices;