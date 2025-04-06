import { AxiosError } from "axios";

export class RequiresReauthError extends Error {
  constructor(public readonly cause: AxiosError) {
    super(`Re-authentication is required.`);
    this.name = "RequiresReauthError";
  }
}
