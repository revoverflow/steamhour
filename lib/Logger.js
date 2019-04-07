require("colors");

class Logger {

    static out(tag, content) {
        console.log(tag.blue + " > " + content)
    }

    static done(tag, content) {
        console.log(tag.green + " > " + content.green)
    }

    static error(tag, content) {
        console.log(tag.red.inverse + " > " + content.red)
    }
    
}

module.exports = Logger;