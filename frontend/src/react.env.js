import {PRODUCTION, API_PRODUCTION, API_DEVELOPMENT, GOOGLE_CLIENT_ID} from './react.config'

export const API = PRODUCTION ? API_PRODUCTION : API_DEVELOPMENT;

export const GOOGLE = GOOGLE_CLIENT_ID