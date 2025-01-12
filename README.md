<h1 align="center">Welcome to Peppermint Ticket Management 🍵</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.2-blue.svg?cacheSeconds=2592000" />
  <a target="_blank">
    <img alt="Github Stars: " src="https://img.shields.io/github/stars/jwandrews99/winter?style=social" />
  </a>
  <img src="https://img.shields.io/docker/pulls/pepperlabs/peppermint" />
</p>
<p align="center">
    <img src="https://peppermint.sh/images/logo_green.svg" alt="Logo" width="350px" >
</p>
<p align="center">This project is supported by:</p>
<p align="center">
  <a href="https://www.digitalocean.com/">
    <img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg" width="201px">
  </a>
</p>

> Ticket Management System in order to help helpdesks & service desks manage internal staff & customer requests

## Introduction

It's a self hosted alternative to popular services such as zendesk

<img src="./static/homepage.png" width="50%" >

## ✨ Features

- **Ticket Creation**: Bog standard ticket creation with a markdown editor and file uploads
- **A log of client history**
- **Markdown based Notebook with todo lists**
- **Responsive**: Designed for variable screen sizes from mobile up to 4k
- **Multi-deployment**: Quickly deploy using docker & pm2
- **Simple to Use**: Designed to be easy to use with a simple logical workflow

## 🐳 Installation with docker

Currently only linux has been verified as working but we are open to the idea of supporting windows eventually as well.

Keep in mind, this is an alpha so the risk of data loss is real and it may not be stable, we do not recommend anyone runs this in a production enviroment.

Check out the getting started guide if this is the first time you've used Peppermint:

```
version: "3.1"

services:
  postgres:
    container_name: postgres
    image: postgres:latest
    restart: always
    volumes:
      - peppermint/db:/data/db
    environment:
      POSTGRES_USER: peppermint
      POSTGRES_PASSWORD: 1234
      POSTGRES_DB: peppermint

  client:
    container_name: peppermint
    image: pepperlabs/peppermint
    ports:
      - 5000:5000
    restart: on-failure
    depends_on:
      - postgres
    environment:
      PORT: 5000
      DB_USERNAME: "peppermint"
      DB_PASSWORD: "1234"
      DB_HOST: "postgres"
      BASE_URL: "http://localhost"

```

## Supported Environment Variables

You can utilize the following environment variables in Peppermint. None of them are manditory.

| Variable    | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| PUID        | Set userid that the container will run as.                          |
| PGID        | Set groupid that the container will run as.                         |
| DB_USERNAME | Enter database username here                                        |
| DB_PASSWORD | Enter database password here                                        |
| PORT        | Choose a custom port to run the app on rather than the default 5000 |

### Setting up postgres on Macos in a container for local development

```
docker run --rm -P -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD="1234" --name pg postgres:alpine
```

## One click installers

- We are now on linode marketplace we can be viewed here <a href="https://www.linode.com/marketplace/apps/peppermint-lab/peppermint/">here</a>

## Roadmap for new features

There is currently a trello roadmap available which is updated daily - https://trello.com/b/tOMsptar/peppermint

## Documentation

We have started working on creating documentation for peppermint which covers development to general usage. Click <a href="https://docs.peppermint.sh">here</a> to be taken directly there.

## Motiviation

- This was initially a project to tie together my react and nodeJS skills and show something for my portfolio
- It looked terrible! But it worked and showed functionaility, which got me a job.
- Learn and deploy with docker
- Redo the UI, completly from the ground up. Which has now been completed and for me looks great.
- Build on this foundation and create a fully fledged product which offers what the big boys offer, but, at a much better ROI than signing up for zendesk etc.

Give a ⭐️ if this project helped you!

## Screenshots

<p align="center">
    <img src="./static/homepage.png" alt="Logo" width="350px" >
    <img src="./static/create_a_ticket.png" alt="Logo" width="350px" >
    <img src="./static/tickets.png" alt="Logo" width="350px" >
    <img src="./static/detail.png" alt="Logo" width="350px" >
</p>

## Author

👤 **Jack Andrews**

- Website: [peppermint.sh](https://peppermint.sh/)
- Twitter: [@andrewsjack18 ](https://twitter.com/andrewsjack18)
- Github: [@potts99](https://github.com/potts99)
- LinkedIn: [@jack-andrews-146852131](https://linkedin.com/in/jack-andrews-146852131)
