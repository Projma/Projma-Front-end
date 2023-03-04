# Some Docker Commands
written by **Farzan Rahmani**

[![Avatar](https://avatars.githubusercontent.com/u/74285751?v=4)](https://github.com/FarzanRahmani)

## list all running containers
```sh
docker ps
```

## build image
```sh
docker build -t myimage . # -t is for tagging
docker build -t farzanrahmani/demoapp:1.0 .
```

## run image
```sh
docker run image_id
```

## port forwarding to localhost (to see and access our container locally)
```sh
docker run -p 8080:8080 image_id
docker run -p 5000:8080 image_id # see local port 5000
```

## run image in background
```sh
docker run -d image_id
```

## share data cross multiple containers to persist files
```
docker volume create myvolume
docker volume create shared-stuff(shared files storage)
```

## run image with volume
```sh
docker run -d -p 8080:8080 -v myvolume:/app/shared myimage
docker run \
--mount source=shared-stuff,target=/app/shared
```

## debugging
- use docker desktop to see logs and search among them (kibana) 
- (or execute commands in a container by clicking on CLI button)
```sh
docker logs container_id
```

## TIP : use docker-compose to run multiple containers at once
- 1 Process per container
```sh
docker-compose up # find docker-compose.yml file in current directory and run it
```

## License

MIT
