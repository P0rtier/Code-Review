import { EnviromentProfiles } from "../enums/EnviromentProfiles";


export const isDev = process.env.REACT_APP_ENV === EnviromentProfiles.Development;
