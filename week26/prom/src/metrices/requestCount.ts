import { NextFunction, Request, Response } from "express";
import client from "prom-client";


const requestCounter = new client.Gauge({
    name: "active users",
    help:" Total number of HTTP requests",
    labelNames: ['method', 'route', 'status_code']
});

export const requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
    });

    next();
};