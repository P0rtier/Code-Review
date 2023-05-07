import { EnvironmentProfiles } from "../enums/EnvironmentProfiles";

export const isTestEnv = process.env.REACT_APP_ENV === EnvironmentProfiles.Test;

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const passwordRegex =
  /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&? "]).*$/;
