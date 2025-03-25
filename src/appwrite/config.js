import { Client, Databases, ID, Query, Storage } from 'appwrite'
import conf from '../conf/conf'


export class Service {
    client = new Client()
    databses;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databses = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, content, slug, featuredImage, userId, status }) {
        try {
            return await this.databses.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service::createPost:: error", error);
        }

    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databses.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service::updatePost:: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databses.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("Appwrite service::deletePost:: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databses.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service::getPost:: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databses.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service::getPost:: getPosts", error);
            return false
        }
    }

    // upload file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service::getPost:: uploadFile", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service::getPost:: deleteFile", error);
            return false
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const service = new Service()

export default service;