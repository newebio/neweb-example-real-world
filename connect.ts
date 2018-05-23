type ConnectFn = <T, C extends { [index: string]: any }>(clas: new (config: C) => T) => ConnectedClass<T, C>;
type ConnectedClass<CLASS, CONFIG> = <
    RESOLVERS extends { [P in keyof CONFIG]?: CONFIG[P] }>(
    resolvers?: RESOLVERS,
) => new (config: { [X in Exclude<keyof CONFIG, keyof RESOLVERS>]: CONFIG[X] }) => CLASS;

export const connect: ConnectFn = ((clas: any) => {
    return (resolvers: any) => {
        // tslint:disable-next-line:only-arrow-functions space-before-function-paren
        return function (params: any) {
            return new clas({ ...params, ...resolvers });
        };
    };
}) as any;
export default connect;
