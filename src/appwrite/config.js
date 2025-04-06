import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    expectation,
    description,
    expectdescription,
    images,
    userId,
    category,
    state,
    city,
    phoneno,
  }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          description,
          expectation,
          expectdescription,
          city,
          state,
          phoneno,
          category,
          userId,
          images
        }
      );
    } catch (error) {
      console.log("Error at creatPost at config:: ", error);
      throw error;
    }
  }
  

  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true; // return true if document delete successfully
    } catch (error) {
      console.log("Error at deletePost at config:: ", error);
      return false; //else return false if document is not delete
    }
  }

  async getAllPosts() {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Error at getAllPosts at config:: ", error);
      return false;
    }
  }

  async getPostsBySearch(search) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("title", search)]
      );
    } catch (error) {
      console.log("Error at getAllPosts at config:: ", error);
      return false;
    }
  }

  async getPostsByCategory(category) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("category", category)]
      );
    } catch (error) {
      console.log("Error at getAllPosts at config:: ", error);
      return false;
    }
  }
  async getMyPosts(userID) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("userId", userID)]
      );
    } catch (error) {
      console.log("Error at getMyPosts at config:: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error at getPost at config:: ", error);
    }
  }

  //file services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return true;
    } catch (error) {
      console.log("Error at uploadFile at config:: ", error);
      throw error;
    }
  }

  async deleteFile(fileID) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileID);
      return true;
    } catch (error) {
      console.log("Error at deleteFIle at config:: ", error);
      return false;
    }
  }
  
   getFileView(fileID) {
    try {
      const file =  this.bucket.getFileView(conf.appwriteBucketId, fileID)
      return file
    }
    catch (e) {
      console.log("Error at getFileView at cofig:: ", e)
      throw e
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  async searchItem(item) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.startsWith("title", item)]
      );
    } catch (error) {
      console.log("Error at searchItems at config:: ", error);
      throw error
      return false;
    }
  }
}

const service = new Service()
export default service