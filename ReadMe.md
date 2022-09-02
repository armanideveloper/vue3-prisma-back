# Before Setup

_Useful links_

- [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)
- [Passport-jwt](https://www.passportjs.org/packages/passport-jwt/)


Use [this link](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
for formatting `.md` files.

# Setup

- Run `npm install`
- Create MySQL (or similar) database in your local environment.
- Copy `.env.example` file into `.env`.
- Change USERNAME, PASSWORD, DB_NAME values in `.env` file with your credentials (DB_NAME is the name of your created database). If you haven't password, just leave it empty.
- Run `npx prisma migrate dev --name init`.

# Run project

- Run `npm run server`.
- Remember the port on which server is running. You will need it for connecting front-end to backend. Usually it is `3000`.
