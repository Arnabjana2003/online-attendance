import { addDoc, collection,deleteDoc,doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase.config";

class Services{
    async addMember(userData={}){
        try {
            return await addDoc(collection(db,"members"),userData)
        } catch (error) {
            throw error
        }
    }
    async addStudent(department,year,userData={}){
        try {
            return await addDoc(collection(db,`${department}`,`${department} collection`,`${department} students`,year,"students"),userData)
        } catch (error) {
            throw error
        }
    }
    async getStudents(department,year){
        try {
            return await getDocs(collection(db,`${department}`,`${department} collection`,`${department} students`,year,"students"))
        } catch (error) {
            throw error
        }
    }
    async updateStudents(department,year,id,data={}){
        try {
            return await updateDoc(doc(db,`${department}`,`${department} collection`,`${department} students`,year,"students",`${id}`),data)
        } catch (error) {
            throw error
        }
    }
    async deleteStudent(department,year,userId){
        try {
            return await deleteDoc(doc(db,`${department}`,`${department} collection`,`${department} students`,year,"students",`${userId}`))
        } catch (error) {
            console.log(error.message);
            throw error
        }
    }
    async takeAttendance(department,year,data){
        try {
            return await addDoc(collection(db,`${department}`,`${department} collection`,"attendance",year,`${year} attendance list`),data)
        } catch (error) {
            throw error
        }
    }
    async checkAttendance(department,year){
        try{
            return await getDocs(collection(db,`${department}`,`${department} collection`,"attendance",year,`${year} attendance list`))
        }catch(error){
            throw error
        }
    }
    async search(collectionRef = [],queryArr=[]){
        try{
            const q = query(collection(db,...collectionRef),where(...queryArr))
            return await getDocs(q)
        }catch(err){
            throw err;
        }
    }
    async addDocument(collectionRef=[],data={}){
        try {
            return await addDoc(collection(db,...collectionRef),data)
        } catch (error) {
            throw error
        }
    }
}
const services = new Services()
export default services;