# Challenge Back-end Kinvo

- developer: [Lucas Mortoni](https://github.com/lucasmortoni)

### installing

- first thing to do is clone this repository
- secondly, after navigating to inside of the cloned folder, you should run:
```yarn```
- then you can instantiate the docker database container with: ```docker compose up -d```
- now you can create a .env file containing this info: ```DATABASE_URL=postgresql://challenge:challenge@localhost:5432/challengedb```
- then, you should run: ```yarn prisma db push``` so prisma can handle the 'migrations' (though its not a migration)
- and run the app with: ```yarn server```


### simulating api runs

some usage of api requests can result in not correctly info as passing ```page=2``` to listing funcionality when it isn't enough info for a second page return, so would just return an empty array, better error treatment could be done there.

i've tried to be the clearest possible, with semantic names in all i can remember.
