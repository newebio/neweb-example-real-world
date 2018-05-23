class Config {
    get logger() {
        return console;
    }
    get apiEndpoint() {
        return "https://conduit.productionready.io/api";
    }
}
export default new Config();
