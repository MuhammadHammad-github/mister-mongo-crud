import { Model, Types } from "mongoose";
export type CreateProps = {
  model: Model<any>;
  query: Record<string, any>;
  important: string[];
};
export type ReadProps = {
  model: Model<any>;
  query: Record<string, any>;
  toPopulate: string[];
};
export type UpdateProps = {
  model: Model<any>;
  query: Record<string, any>;
  id: string;
};
export type DeleteOneProps = {
  model: Model<any>;
  id: Types.ObjectId | string;
};
export type DeleteProps = {
  model: Model<any>;
  ids: Types.ObjectId[] | string[];
};
