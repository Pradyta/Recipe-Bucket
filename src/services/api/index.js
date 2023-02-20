import { getEnvValue } from "../../utils";

export const axiosOptions = {
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": getEnvValue("API_KEY"),
  },
};
