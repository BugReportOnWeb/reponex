import { NextFunction, Request, Response } from "express";
import { Log } from "../types/log";

const logging = (req: Request, _res: Response, next: NextFunction) => {
    let log: Log = {
        method: req.method,
        path: req.path
    }

    const body = req.body;
    const bodyExists = Object.keys(body).length > 0;
    if (bodyExists) log = { ...log, body };

    console.log(log);
    next();
}

export { logging };
