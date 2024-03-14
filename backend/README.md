
## Database setup

First step to start working with application is creating environment file in root directory of this project:

**.env.development.local**

```shell
DATABASE_URL=mongodb+srv://<USER_NAME>:<USER_PASSWORD>@cluster0.uq22wsx.mongodb.net/<DATABASE_NAME>
```

Replace next fields with your credentials:
* __USER_NAME__, 
* __USER_PASSWORD__,
* __DATABASE_NAME__,

then run next scripts:

```shell
pnpm run db:generate
```

```shell
pnpm run db:push
```

## API

Current port: **8080**

API Prefix: __v1/api__