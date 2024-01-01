import {  createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import { auth } from "./firebase.config";
import services from "./services";
import { useDispatch } from "react-redux";
import {login,logout} from '../store/authSlice'

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
    getCurrentUser(fn){
       onAuthStateChanged(auth,fn)
    }
    async deleteUser(uid){
        return await deleteUser(uid)
    }
}

const authServices = new AuthServices()
export default authServices;