// Define the types used in redirect-js-parser.ts
export interface Destination {
  host: string;
  port: number;
}

export interface RedirectResponse {
  destination: Destination;
  status: number;
}