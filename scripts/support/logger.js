class Logger {
    #name;

    constructor(name) {
        this.name = name;
    }

    #format(message) {
        return `[${this.name}]: ${message}`;
    }

    debug(msg, ...args) {
        console.debug(format(msg), ...args);
    }

    info(msg, ...args) {
        console.info(format(msg), ...args);
    }

    warn(msg, ...args) {
        console.warn(format(msg), ...args);
    }

    error(msg, ...args) {
        console.error(format(msg), ...args);
    }
}

module.exports = {
    Logger,
}