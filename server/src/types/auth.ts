import { JwtPayload } from "jsonwebtoken";

type Payload = JwtPayload & { username: string };

export { Payload };
