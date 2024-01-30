# Serverless application with Express and DynamoDB

This is a simgle app using AWS serverless and express,

## Run de project

After install dependencies create a .env file and set up the proper variables(see .env-example)

- TABLE_NAME=YOUR DYNAMO DB Table name
- ACCESS_KEY_ID= YOUR ACCESS KEY (with proper permissions)
- SECRET_ACCESS_KEY=YOUR SECRET KEY (with proper permissions)
- REGION= YOUR AWS REGION


First we need to build our application using the following command: 

``` npm run build ```

Then use the following command to run serverless offline:

``` serverless offline```

Or use 

``` serverless deploy ```
