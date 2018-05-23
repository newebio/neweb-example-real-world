import Api from "./Api";
class Context {
    get logger() {
        return console;
    }
    get api() {
        return new Api({
            endpoint: "http://",
        });
    }
}
export default new Context();
