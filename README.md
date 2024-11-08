
# mister-mongo-crud

This npm package provides reusable CRUD functions for performing standard operations on MongoDB models using Mongoose. Each function handles common CRUD tasks, such as creating, reading, updating, and deleting documents, while providing structured responses and error handling.


## Installation

To install this package, use npm:

```bash
npm install mister-mongo-crud
 ```   
## Usage/Examples


### Create

1. #### misterCreate()
 Creates a new document in the specified model.

#### Parameters:

- model (Model): Mongoose model on which to perform the operation.
- query (object): Data to create the new document.
- important (array of strings): List of required fields. If any of these fields are missing in query, the function returns an error.


```javascript
const result = await misterCreate({ model: YourModel, query: { name: 'John', age: 30 }, important: ['name', 'age'] });

```
#### Response:
- Success: ``` { item: <created item>, success: true, status: 200, message: "Item Created!" } ```
- Error (missing fields): ``` { item: null, success: false, message: "Missing important field: <field_name>", status: 400 } ```

### Read

2. #### misterRead()
Fetches multiple documents from the model based on a query.
#### Parameters:
- model (Model): Mongoose model on which to perform the operation.
- query (object, optional): Filter for retrieving documents.
- toPopulate (array of strings, optional): List of fields to populate in the results.

```javascript
const result = await misterRead({ model: YourModel, query: { age: 30 }, toPopulate: ['relatedField'] });
```
#### Response:
- Success: ``` { items: <array of documents>, success: true, status: 200, message: "Items Fetched!" } ```
- Error: ``` { success: false, message: <error message>, status: <error code> } ```

### ReadOne

3. #### misterReadOne()
Fetches a single document from the model based on a query.

#### Parameters:
- model (Model): Mongoose model on which to perform the operation.
- query (object): Filter for retrieving a single document.
- toPopulate (array of strings, optional): List of fields to populate in the results.

```javascript
const result = await misterReadOne({ model: YourModel, query: { _id: 'someId' }, toPopulate: ['relatedField'] });
```
#### Response:
- Success: ``` { items: <single document>, success: true, status: 200, message: "Item Fetched!" } ```

- Error: ``` { success: false, message: <error message>, status: <error code> } ```

### Update

4. #### misterUpdate()
Updates a document based on its ID.

#### Parameters:
- model (Model): Mongoose model on which to perform the operation.
- query (object): Data to update the document.

- id (ObjectId or string): ID of the document to update.
```javascript
const result = await misterUpdate({ model: YourModel, query: { age: 31 }, id: 'someId' });

```

#### Response:
- Success: ``` { updatedItem: <updated document>, success: true, status: 200, message: "Item Updated!" } ```

- Error (not found): ``` { success: false, status: 404, message: "Item with this id not found! while Updating." } ```

### Delete

5. #### misterDelete()
Deletes multiple documents based on an array of IDs.


#### Parameters:
- model (Model): Mongoose model on which to perform the operation.

- ids (array of ObjectId or string): Array of IDs of documents to delete


```javascript
const result = await misterDelete({ model: YourModel, ids: ['id1', 'id2'] });


```

#### Response:
- Success: ``` { success: true, status: 200, message: "Items Deleted!", deletedCount: <number of items deleted> }```


- Error (not found): ``` { success: false, status: 404, message: "No items found with the provided ids while Deleting Many." } ```


### DeleteOne

6. #### misterDeleteOne()
Deletes a single document based on its ID.




#### Parameters:
- model (Model): Mongoose model on which to perform the operation.

- id (ObjectId or string): ID of the document to delete.



```javascript
const result = await misterDeleteOne({ model: YourModel, id: 'someId' });
```

#### Response:
- Success: ``` { success: true, status: 200, message: "Item Deleted!" } ```


- Error (not found): ``` { success: false, status: 404, message: "Item with this id not found! while Deleting One." } ```

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@MuhammadHammad-github](https://github.com/MuhammadHammad-github)

