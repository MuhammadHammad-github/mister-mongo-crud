import {
  CreateProps,
  DeleteOneProps,
  DeleteProps,
  ReadProps,
  UpdateProps,
} from "./types";
import { rateLimiter, tryCatchError } from "./utils";

export const misterCreate = async ({
  model,
  query,
  important = [],
}: CreateProps) => {
  try {
    for (const item of important) {
      if (!query[item]) {
        return {
          item: null,
          success: false,
          message: `Missing important field: ${item}`,
          status: 400,
        };
      }
    }
    const newItem = await model.create(query);
    return {
      item: newItem,
      success: true,
      status: 200,
      message: "Item Created!",
    };
  } catch (error) {
    return tryCatchError(error, "Creating");
  }
};
export const misterRead = async ({
  model,
  query,
  toPopulate = [],
}: ReadProps) => {
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
export const misterReadOne = async ({
  model,
  query,
  toPopulate = [],
}: ReadProps) => {
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
export const misterUpdate = async ({ model, query, id }: UpdateProps) => {
  try {
    const item = await model.findById(id);
    if (!item)
      return {
        success: false,
        status: 404,
        message: "Item with this id not found! while Updating.",
      };
    const updatedItem = await model.findByIdAndUpdate(id, query, {
      new: true,
    });
    return {
      updatedItem,
      success: true,
      status: 200,
      message: "Item Updated!",
    };
  } catch (error) {
    return tryCatchError(error, "Updating");
  }
};
export const misterDelete = async ({ model, ids }: DeleteProps) => {
  try {
    if (!ids || ids.length === 0) {
      return {
        success: false,
        message: "Id Not Received while Deleting Many.",
        status: 400,
      };
    }

    const deleteResult = await model.deleteMany({ _id: { $in: ids } });

    if (deleteResult.deletedCount === 0) {
      return {
        success: false,
        status: 404,
        message: "No items found with the provided ids while Deleting Many.",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Items Deleted!",
      deletedCount: deleteResult.deletedCount,
    };
  } catch (error) {
    return tryCatchError(error, "Deleting Many");
  }
};

export const misterDeleteOne = async ({ model, id }: DeleteOneProps) => {
  try {
    if (!id)
      return {
        success: false,
        message: "Id Not Received while Deleting One.",
        status: 400,
      };
    const item = await model.findById(id);
    if (!item)
      return {
        success: false,
        status: 404,
        message: "Item with this id not found! while Deleting One.",
      };
    await model.findByIdAndDelete(id);
    return { success: true, status: 200, message: "Item Deleted!" };
  } catch (error) {
    return tryCatchError(error, "Deleting One");
  }
};
