# Hearthstone-api-to-mysql

**Hearthstone-api-to-mysql** is a **NodeJS** script who consume rest API from **Blizzard** and save all data into your **Mysql** database.


# Installation
```shell
git clone git@github.com:Kidaas/Hearthstone-api-to-mysql.git
npm install
```

# Configuration
#### Set access token from [Blizzard](https://develop.battle.net/documentation/guides/using-oauth)

```shell
#.env
BNET_ID=''
BNET_SECRET=''
```
### Set your database credentials
```shell
#.env
HOST=''
USER=''
PASSWORD=''
DATABASE='hearthstone_stat'
```

# Run
```shell
node index.js
```
