import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import { login } from "../store/authSlice";

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
                await this.login({email,password})
                const promise = await this.account.createVerification("http://localhost:5173/verify");
                await this.logout()
            }
            else {
                return null     
            }
        } catch (error) {
            console.log("Error at creatAccount at Auth:: ",error)
            throw error
        }
    }

    async verify() {
        const urlParams = new URLSearchParams(window.location.search);
        const secret = urlParams.get("secret");
        const userId = urlParams.get("userId");

        const promise = await this.account.updateVerification(userId, secret);
    }

    async forgotPassword( email ) {
        try {
            await this.account.createRecovery(
              email,
              "http://localhost:5173/reset"
            );
        } catch (e) {
            console.log("error ata Forgotpassword at auth:: ", e)
            throw e
        }
    }

    async resetPassword(password) {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const secret = urlParams.get("secret");
            const userId = urlParams.get("userId");
            await this.account.updateRecovery(userId,secret,password)
        }
        catch (e) {
            console.log("error ata resetpassword at auth:: ", e);
            throw e;
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
            console.log("Error at getCurrentUser at Auth:: ", error);
            throw error 
        }
        
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