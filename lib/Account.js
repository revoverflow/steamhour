/*
    Classe "Account"
    --------
    Cette classe permet de répeter la connexion aux 
    comptes plusieures fois sans tout recopier.
*/
require("colors");

// Importation des librairies
const SteamUser = require("steam-user");
const readline = require('readline');

const Logger = require("./Logger");

var requestState = false;

class Account {

    constructor(username, pass, games) {
        this.username = username;
        this.password = pass;
        this.games = games;
        this.connected = false;
    }

    login() {
        return new Promise((rs, rj) => {
            this.client = new SteamUser();
            
            this.client.logOn({
                accountName: this.username,
                password: this.password
            });

            this.client.on("loggedOn", () => {
                Logger.out("Steam", "Connected to " + this.username + " !");
                this.startIdle();
                this.connected = true;
                rs(true);
            });

            this.client.on("steamGuard", async (dom, cb) => {
                Logger.out("SteamGuard", "Your account is protected by SteamGuard, we need your 2FA code to continue :");
                var code = await this.requestCode();
                requestState = false;
                cb(code);
            });
            
            this.client.on("error", err => {
                Logger.error("Steam", "An error occured while connecting to " + this.username + " !");
                rs(false);
            });
        });
    }

    startIdle() {
        this.client.setPersona(SteamUser.EPersonaState.Online);
        this.client.gamesPlayed(this.games);
        Logger.out("Steam", "Idling is now started for " + this.username + ".");
    }

    requestCode() {
        return new Promise((rs, rj) => {
            requestState = true;

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    
            rl.question('?> '.yellow, (answer) => {
                rs(answer);
                rl.close();
            });
        });
    }
}

module.exports = Account;