class Logger {
    #name;

    constructor(name) {
        this.name = name;
    }

    #format(message) {
        return `[${this.name}]: ${message}`;
    }

    debug(msg, ...args) {
        console.debug(this.format(msg), ...args);
    }

    info(msg, ...args) {
        console.info(this.format(msg), ...args);
    }

    warn(msg, ...args) {
        console.warn(this.format(msg), ...args);
    }

    error(msg, ...args) {
        console.error(this.format(msg), ...args);
    }
}

module.exports = {
    Logger,
}
