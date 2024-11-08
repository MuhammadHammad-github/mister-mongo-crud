"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  misterCreate: () => misterCreate,
  misterDelete: () => misterDelete,
  misterDeleteOne: () => misterDeleteOne,
  misterRead: () => misterRead,
  misterReadOne: () => misterReadOne,
  misterUpdate: () => misterUpdate
});
module.exports = __toCommonJS(src_exports);

// src/utils.ts
var tryCatchError = (error, text) => {
  if (error instanceof Error) {
    console.error(`Error while ${text}:`, error.message);
    console.error(error.stack);
    if (error.name === "ValidationError") {
      return {
        message: `Validation failed while ${text}. Check the input data.`,
        status: 400,
        success: false
      };
    } else if (error.name === "MongoError" && error.code === 11e3) {
      return {
        message: `Duplicate key error while ${text}. Ensure unique constraints are met.`,
        status: 409,
        success: false
      };
    } else if (error.name === "CastError") {
      return {
        message: `Invalid ID format provided while ${text}.`,
        status: 400,
        success: false
      };
    } else if (error.name === "NetworkError" || error.message.includes("ECONNREFUSED")) {
      return {
        message: `Database connection issue occurred while ${text}. Please try again later.`,
        status: 503,
        success: false
      };
    }
    return {
      message: `An error occurred while ${text}: ${error.message}`,
      status: 500,
      success: false
    };
  } else {
    console.error(`An unknown error occurred while ${text}:`, error);
    return {
      message: `An unexpected error occurred while ${text}.`,
      status: 500,
      success: false
    };
  }
};

// src/crud.ts
var misterCreate = async ({
  model,
  query,
  important
}) => {
  try {
    for (const item of important) {
      if (!query[item]) {
        return {
          item: null,
          success: false,
          message: `Missing important field: ${item}`,
          status: 400
        };
      }
    }
    const newItem = await model.create(query);
    return {
      item: newItem,
      success: true,
      status: 200,
      message: "Item Created!"
    };
  } catch (error) {
    return tryCatchError(error, "Creating");
  }
};
var misterRead = async ({
  model,
  query,
  toPopulate = []
}) => {
  try {
    if (!Array.isArray(toPopulate)) {
      throw new Error("toPopulate must be an array.");
    }
    const items = await model.find(query).populate(toPopulate);
    return { items, success: true, status: 200, message: "Items Fetched!" };
  } catch (error) {
    return tryCatchError(error, "Reading Many");
  }
};
var misterReadOne = async ({
  model,
  query,
  toPopulate = []
}) => {
  try {
    if (!Array.isArray(toPopulate)) {
      throw new Error("toPopulate must be an array.");
    }
    const items = await model.findOne(query).populate(toPopulate);
    return { items, success: true, status: 200, message: "Items Fetched!" };
  } catch (error) {
    return tryCatchError(error, "Reading One");
  }
};
var misterUpdate = async ({ model, query, id }) => {
  try {
    const item = await model.findById(id);
    if (!item)
      return {
        success: false,
        status: 404,
        message: "Item with this id not found! while Updating."
      };
    const updatedItem = await model.findByIdAndUpdate(id, query, {
      new: true
    });
    return {
      updatedItem,
      success: true,
      status: 200,
      message: "Item Updated!"
    };
  } catch (error) {
    return tryCatchError(error, "Updating");
  }
};
var misterDelete = async ({ model, ids }) => {
  try {
    if (!ids || ids.length === 0) {
      return {
        success: false,
        message: "Id Not Received while Deleting Many.",
        status: 400
      };
    }
    const deleteResult = await model.deleteMany({ _id: { $in: ids } });
    if (deleteResult.deletedCount === 0) {
      return {
        success: false,
        status: 404,
        message: "No items found with the provided ids while Deleting Many."
      };
    }
    return {
      success: true,
      status: 200,
      message: "Items Deleted!",
      deletedCount: deleteResult.deletedCount
    };
  } catch (error) {
    return tryCatchError(error, "Deleting Many");
  }
};
var misterDeleteOne = async ({ model, id }) => {
  try {
    if (!id)
      return {
        success: false,
        message: "Id Not Received while Deleting One.",
        status: 400
      };
    const item = await model.findById(id);
    if (!item)
      return {
        success: false,
        status: 404,
        message: "Item with this id not found! while Deleting One."
      };
    await model.findByIdAndDelete(id);
    return { success: true, status: 200, message: "Item Deleted!" };
  } catch (error) {
    return tryCatchError(error, "Deleting One");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  misterCreate,
  misterDelete,
  misterDeleteOne,
  misterRead,
  misterReadOne,
  misterUpdate
});
