"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pageTitle: 'TMS Monitor',
    port: 3000,
    path: '/status',
    ignoreStartsWith: '/health/alive',
    spans: [
        {
            interval: 1,
            retention: 60,
        },
        {
            interval: 5,
            retention: 60,
        },
        {
            interval: 15,
            retention: 60,
        }
    ],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    healthChecks: []
};
//# sourceMappingURL=statusMonitor.js.map