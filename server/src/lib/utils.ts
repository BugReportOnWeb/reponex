import jwt from "jsonwebtoken";

const generateUUID = () => {
    const s4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4());
}

const createToken = (username: string) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        const error = "Please provide JWT secret in config (.env) files";
        throw new Error(error);
    }

    const tokenOptions = { expiresIn: '3d' };
    const token = jwt.sign({ username }, JWT_SECRET, tokenOptions);
    return token;
}

export { generateUUID, createToken };
