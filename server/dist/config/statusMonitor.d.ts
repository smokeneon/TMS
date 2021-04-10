declare const _default: {
    pageTitle: string;
    port: number;
    path: string;
    ignoreStartsWith: string;
    spans: {
        interval: number;
        retention: number;
    }[];
    chartVisibility: {
        cpu: boolean;
        mem: boolean;
        load: boolean;
        responseTime: boolean;
        rps: boolean;
        statusCodes: boolean;
    };
    healthChecks: any[];
};
export default _default;
