# Local Postgres Database

Some notes on how I set it up in case I need to replicate it

## Installation

I followed [This guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database#setting-up-postgresql-on-windows) for how to install postgres locally. This part, however, was extremely straightforward

## Setup

To run postgres on my Windows installation, I had to run the specific shell that was installed with postgres. This is called SQL Shell (psql) and can be found by using the Windows search bar.

I then ran the command

```sql
CREATE DATABASE gahdzai;
```

in that shell. The semicolon at the end of the line is important.

### Connection

I connected to this database by just modifying database lines in the .env file.

Specifically, I created 3 new lines

```env
DATABASE_URL="postgresql://user:password@localhost:5432/gahdzai
DATABASE_MASTER_USERNAME="user"
DATABASE_MASTER_PASSWORD="password"
```

Where user and password are the superuser values I set up when installing postgres.

I believe I should also be able to figure out how to create users for the gahdzai database too and use those, but I haven't done that and the superuser works

## Prisma

I then had to initiate prisma on the new database. I simply did this by running

```bash
npx prisma migrate dev
```

in a vscode terminal window

## Running DB

It seems the SQL shell window does not need to remain open for the server to keep running. I'm not sure yet if I need to restart it every time I reboot my computer or if it starts with windows or something like that.

## PSQL

Ok, so I was very confused by this for a bit so I'm going to try to write out my understanding.

First, I had to add psql to the PATH of my windows machine.

I followed [this guide](https://stackoverflow.com/questions/11460823/setting-windows-path-for-postgres-tools) for that. The basic steps are:

- Open windows settings, search for "Advanced system settings". Select "View advanced system settings"
- Click the "Environment Variables" button to open that menu
- From the System Variables box select "PATH", then hit the "Edit" button
- Add the location of your local postgres install as a new PATH variable. For me on this machine that location is C:\Program Files\PostgreSQL\14\bin

While we're there, there's another thing I did in the Environment Variables menu that made life easier: setting 'postgres' (my postgres superuser) as the default user when invoking postgres commands.

I followed [this guide](https://stackoverflow.com/questions/44753191/how-to-change-default-user-for-psql-command) to do that. The steps here are:

- In that same 'System Variables' menu, click the 'New' button
- Variable Name: PGUSER
- Variable Value: postgres

Now I can execute commands as they're given in the PostgreSQL docs

## Backup and Restore

Based on [this part](https://www.postgresql.org/docs/current/backup-dump.html) of the PostgreSQL.org docs.

> "The idea behind this dump method is to generate a file with SQL commands that, when fed back to the server, will recreate the database in the same state as it was at the time of the dump. PostgreSQL provides the utility program pg_dump for this purpose."

The command here is

```bash
pg_dump dbname > dumpfile
```

this will create a text file called "dumpfile" in the current working directory that has the contents of database dbname in it.

To restore that file, use the command

```bash
psql dbname < dumpfile
```

Note that this will not create the database dbname, so it has to already exist, and it should be created with template0 as the dump is relative to that template. To do that, use the command

```bash
$createdb -T template0 dbname
```

Check the guide linked above I guess for any more detailed information.
