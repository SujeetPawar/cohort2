import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);

const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [
  {
    name: "sujeet",
    age: 21,
  },
  {
    name: "shantanu",
    age: 21,
  },
];

function addPerson(call, callback) {
  console.log(call);
  let persons = {
    name: call.request.name,
    age: call.request.age,
  };
  PERSONS.push(persons);
  callback(null, persons);
}

function getPersonByName(call, callback) {
  const name = call.request.name;
  const person = PERSONS.find((x) => x.name === name);
  callback(null, person);
}

const server = new grpc.Server();

server.addService(
  (personProto.AddressBookService as ServiceClientConstructor).service,
  { addPerson: addPerson, getPersonByName: getPersonByName }
);

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  }
);
