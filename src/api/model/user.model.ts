import mongoose = require("mongoose");
import db = require("../lib/mongo.lib");
import logger = require("../lib/logger.lib");
import {Schema, Model} from "mongoose";

export class User {
  public userSchema: Schema;

  constructor(_hashedPassword: string, _role: string, _userName: string) {
   this.userSchema = new mongoose.Schema({
      created: {
        default: Date.now,
        type: Date
      },
      hashedPassword: {
        required: true,
        type: String
      },
      role: {
        required: true,
        trim: true,
        type: String
      },
      userName: {
        required: true,
        trim: true,
        type: String,
        unqiue: true
      }
    });

  }
  getModel(callback: any): void {
    db.createModel("Users", this.userSchema, callback);
  }
  createUser(userModel: Model, userObject: string, callback: any): void {
    db.createDocument(userModel, userObject, function(result: any): any {
      if (result instanceof Error) {
        this.handleError("Failed to create user", callback); // used this because it didn't find the function without it for some reason
      } else {
        callback(result);
      }
    });
  }

  handleError(message: any, callback: any): void {
    let error: Error = new Error(message);
    logger.log(message);
    callback(error);
  }
}
