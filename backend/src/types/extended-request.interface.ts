import { Request } from "express";

interface ExtendedRequest extends Request {
  userIsAdmin?: boolean
}

export default ExtendedRequest;