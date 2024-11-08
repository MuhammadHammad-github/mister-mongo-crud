import { Model, Types } from 'mongoose';

type CreateProps = {
    model: Model<any>;
    query: Record<string, any>;
    important: string[];
};
type ReadProps = {
    model: Model<any>;
    query: Record<string, any>;
    toPopulate: string[];
};
type UpdateProps = {
    model: Model<any>;
    query: Record<string, any>;
    id: string;
};
type DeleteOneProps = {
    model: Model<any>;
    id: Types.ObjectId | string;
};
type DeleteProps = {
    model: Model<any>;
    ids: Types.ObjectId[] | string[];
};

declare const misterCreate: ({ model, query, important, }: CreateProps) => Promise<{
    message: string;
    status: number;
    success: boolean;
} | {
    item: any;
    success: boolean;
    status: number;
    message: string;
}>;
declare const misterRead: ({ model, query, toPopulate, }: ReadProps) => Promise<{
    message: string;
    status: number;
    success: boolean;
} | {
    items: any[];
    success: boolean;
    status: number;
    message: string;
}>;
declare const misterReadOne: ({ model, query, toPopulate, }: ReadProps) => Promise<{
    message: string;
    status: number;
    success: boolean;
} | {
    items: any;
    success: boolean;
    status: number;
    message: string;
}>;
declare const misterUpdate: ({ model, query, id }: UpdateProps) => Promise<{
    message: string;
    status: number;
    success: boolean;
} | {
    updatedItem: any;
    success: boolean;
    status: number;
    message: string;
}>;
declare const misterDelete: ({ model, ids }: DeleteProps) => Promise<{
    message: string;
    status: number;
    success: boolean;
} | {
    success: boolean;
    status: number;
    message: string;
    deletedCount: number;
}>;
declare const misterDeleteOne: ({ model, id }: DeleteOneProps) => Promise<{
    message: string;
    status: number;
    success: boolean;
}>;

export { misterCreate, misterDelete, misterDeleteOne, misterRead, misterReadOne, misterUpdate };
