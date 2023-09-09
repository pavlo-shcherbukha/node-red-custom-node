# Node-RED Custom Nodes
This repo contains example how to develop custom nodes and  organise  development and deployment process  Node-RED  application

## Custom Nodes


- /wshlog - the node which is using wisnton logger for logging in file or in console

- /wnode - simple empty demo example which shows how to build config node and main node.
 
 More details  you can read in my blog 


There are two flows: 
- **user-registration.json** contains 3 http methods which emulates create, get and delete user in some system.
- **loader.json**  contains 3 flows which are invoce  http methods from  user-registration.json after time period (10 sec).

## user-registration.json developed API

### resource name: "/user" has a few method  (and a few flows) which emulates create, get and delete user in some system

#### **Create user http: post, path /user**

- Request: 

```
{"username": "user1",
 "fullname": "piter buter",
"phone": "222-33-44"
}
```

- Response:
Status Code: 200
```
{
  "user_params": {
    "username": "user1",
    "fullname": "piter buter",
    "phone": "222-33-44"
  },
  "user_id": "151",
  "ok": true
}
```
#### **Get user by id http: get, path /user**

- Request: 

Request as a parameter in url

```
/user?id=199
```

- Response:
Status Code: 200
```json
{"id":"199","fullname":"Petro Petrenko","phone":"222-33-44"}
```

#### **Delete user by id http: delete, path /user**

- Request: 

Request as a parameter in url

```
/user?id=199
```

- Response:

Status Code: 200
```json
{
  "ok": true,
  "id": "199",
  "message": "user deleted"
}
```

#### Error messages 

Status Code: 422

{
  "errcode": "ValueRangeError",
  "message": "Propery [id]  must be between 100 and 200"
}


## Run on your laptop

1. run 

``` bash
        git clone https://github.com/pavlo-shcherbukha/node-red-in-openshift.git
```

2. run **user-registration.json** in development mode

```bash
npm run dev

```

Then go to http://localhost:1880


3. run **loader.json**

Before you need run **user-registration.json** in the test mode, then run **loader.json** in development mode, because of dependency so:

```bash
        # run  user-registration.json in test mode. 
        # will be accessed on http:/localhost:8080/
        npm run test

        # run loader.json in develpment mode
        # will be accessed on http:/localhost:1880/

        npm run devloader
```


## Deploy on Openshift

- You have to reserve [Red Hat OpenShift sendbox](https://developers.redhat.com/developer-sandbox) 

- Prepare **login CMD file**

- Create  github  secret in case of private repository

- Input correct data in 
    - 1-user-reg_srvc-process.cmd  - deployment for **user-registration.json**
    - 2-loader_srvc-process.cmd - deployment for **loader.json**
    - 1-route-user-reg-process.cmd - router for **user-registration.json**
    - 2-route-loader-process.cmd - router for **loader.json**


- run 
    - 1-user-reg_srvc-process.cmd  - deployment for **user-registration.json**
    - 2-loader_srvc-process.cmd - deployment for **loader.json**
    - 1-route-user-reg-process.cmd - router for **user-registration.json**
    - 2-route-loader-process.cmd - router for **loader.json**


