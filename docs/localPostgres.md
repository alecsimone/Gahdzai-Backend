Some notes on how I created a local postgres database for when I need to replicate it:

# Installation

I followed [This guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database#setting-up-postgresql-on-windows) for how to install postgres locally. This part, however, was extremely straightforward

# Setup

To run postgres on my Windows installation, I had to run the specific shell that was installed with postgres. This is called SQL Shell (psql) and can be found by using the Windows search bar.

I then ran the command

```
CREATE DATABASE gahdzai;
```

in that shell. The semicolon at the end of the line is important.

# Connection

I connected to this database by just modifying database lines in the .env file.

Specifically, I created 3 new lines

```
DATABASE_URL="postgresql://user:password@localhost:5432/gahdzai
DATABASE_MASTER_USERNAME="user"
DATABASE_MASTER_PASSWORD="password"
```

Where user and password are the superuser values I set up when installing postgres.

I believe I should also be able to figure out how to create users for the gahdzai database too and use those, but I haven't done that and the superuser works

# Prisma

I then had to initiate prisma on the new database. I simply did this by running

```
npx prisma migrate dev
```

in a vscode terminal window

# Running DB

It seems the SQL shell window does not need to remain open for the server to keep running. I'm not sure yet if I need to restart it every time I reboot my computer or if it starts with windows or something like that.
