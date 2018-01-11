import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "boards",
    Item: {
      userid: event.requestContext.identity.cognitoIdentityId,
      boardid: uuid.v1(),
      type: data.type,
      children: data.children,
      createdAt: new Date().getTime()
    }
  };

  try{
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  }
    catch (e) {
    callback(null, failure({ status: false }));
  }
}
