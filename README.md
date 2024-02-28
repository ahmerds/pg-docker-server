
# Introduction
This project deploys a simple but secure PostgreSQL instance using Docker with periodic backup to S3.

# Setup
- SSH into your server (Tested on Ubuntu 22.04) and switch to a non-root user.
- Ensure that you have [Docker](https://docs.docker.com/desktop/install/linux-install/) installed or run 
```sh
curl -sSL https://get.docker.com | sh
```
- Clone this repo into your desired folder.
- Copy the environment variable sample files using `cp app.env.example app.env` & `cp db.env.example db.env`
- Modify the contents of the `app.env` files and fill in your credentials as required.
- Update the default Postgres user credentials and DB in the `db.env` file.
- Update values in `pgbouncer.env` to match your DB credentials.
- Navigate to [PG-Tune](https://pgtune.leopard.in.ua/) enter your server specifications and update the `postgresql.conf` file. (Default values for a 1vCPU, 2GB RAM VPS).
- If you wish to enable SSL (strongly recommended if you intend to expose the DB to the internet). Follow the **Enable SSL** guide below.
- Run the following to get started
```sh
docker compose up -d
```

## Enable SSL
- While in the project directory, run the following to generate a new self-signed  ca key
```sh
openssl genrsa 2048 > certs/ca.key 
```
    chmod 600 certs/ca.key

- Next, run
```sh
openssl req -new -nodes -x509 -days 100000 -key certs/ca.key -out certs/ca.cert --server
```
    chmod 600 certs/ca.cert
- Anytime you are prompted to fill in addtional details to generate certificate, use your server's hostname as the Alias Common Name and fill the other fields as needed.
- Next, run the following to generate server keys
```sh
openssl req -newkey rsa:2048 -nodes -days 100000 -keyout certs/server.key -out certs/server.csr
```
    chmod 600 certs/server.csr
- Finally, run
```sh
openssl x509 -req -days 100000 -set_serial 01 -in certs/server.csr -out certs/server.cert -CA certs/ca.cert -CAkey certs/ca.key
```
    chmod 600 certs/server.cert
- You can run `cat certs/server.cert` to copy the file content to use on your client side.
- Modify the `postgresql.conf` file to remove the comments from the cert files, uncomment the lines for the certs under `postgres -> volume` in the `docker-compose.yml` file, uncomment the last line in the `pg_hba.conf` file
- Restart your server if it is running, else start it now.

## Additional Notes
You are responsible for implementing measures to properly secure your server. Set up firewalls and protect your credentials.
