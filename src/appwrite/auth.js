import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService { 
    client = new Client();
    account;
    constructor() {  //creating account at time of client
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {  //creating account
        try {
            const acc=await this.account.create(ID.unique(), email, password, name)
            if (acc) {
                //call login methon
                return this.login({email,password})
            }
            else {
                return null     
            }
        } catch (error) {
            console.log("Error at creatAccount at Auth:: ",error)
            throw error
        }
    }

    async login({ email, password }) { //login 
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Error at login at Auth:: ", error);
            throw error
        }
    }

    async getCurrentUser() { //for getting login status
        try {
            return await this.account.get();
        } catch (error) {
            throw error 
            console.log("Error at getCurrentUser at Auth:: ", error);
            return false
        }
        return null   //if noting will happend
    }

    async logout() {  //for log out
        try {
            return this.account.deleteSession('current');
        } catch (error) {
            console.log("Error at logout at Auth:: ", error);
        }
    }
}

const authService = new AuthService()
export default authService