# NestJS Skeleton

## Installation : 
```
pnpm install
```


## Run : 
```
nest start --watch
```


## Manipulate docker :

### Create the database and the user
```docker
docker run --name skeleton-db -e POSTGRES_USER=skeleton-db-user  -e POSTGRES_PASSWORD=skeleton-db-password -e POSTGRES_DB=skeleton-db-name -p 5432:5432 -d postgres
```

### Build api image
```docker
docker build -t skeleton-api .
```

### Run api container
```docker
docker run --name skeleton-api -p 4000:4000 -d skeleton-api
```