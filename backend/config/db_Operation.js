import pkg from "mongoose";
const { models } = pkg;
import { connectToDatabase } from "./db_Connection.js";
async function create(tableName, data, options = null) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.create(data);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
async function updateOne(tableName, filter, update, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.findOneAndUpdate(filter, update, options);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function findOne(tableName, filter, projection = {}, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.findOne(filter, projection, options);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function find(tableName, filter, projection = {}, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.find(filter, projection, options);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function findOneAndUpdate(tableName, filter, update, options = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.findOneAndUpdate(filter, update, {
        new: true,
        ...options,
      });
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

export { create, updateOne, findOne, find, findOneAndUpdate };
