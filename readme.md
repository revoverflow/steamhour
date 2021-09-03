# Steam Hourbooster

Releasing an old project i've made to boost hours on Steam with multiple accounts support.

Just add your accounts in accounts.json by specifying the username, password and games ids to idle.
You can add as much games as you want at the same time !

```json
{
    "accounts": [{
      "username": "STEAM_USERNAME",
      "password": "PASSWORD",
      "games": [730]
    }]
}
```

Warning : The bot will just idle the games in real time, the more it runs, the more the counter grows.
There is no way to speed up this process afaik.
