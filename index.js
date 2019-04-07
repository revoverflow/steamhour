const accounts = require("./accounts.json").accounts;

const Account = require("./lib/Account");
const Logger = require("./lib/Logger");

const delay = require('delay');

var accs = [];

async function start() {
    for (let i = 0; i < accounts.length; i++) {
        Logger.out("Steam", " - Trying to connect to " + accounts[i].username + "...");
        accs[i] = new Account(accounts[i].username, accounts[i].password, accounts[i].games);
        await accs[i].login();
        console.log("");
        await delay(1000);
    }
}

start();