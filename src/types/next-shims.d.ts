declare module "next" {
  export interface Metadata {
    title?: string;
    description?: string;
  }

  export interface NextConfig {
    [key: string]: unknown;
  }
}

declare module "next/server" {
  export class NextResponse extends Response {
    static json(body: unknown, init?: ResponseInit): NextResponse;
  }
}

declare module "next/font/google" {
  export function Inter(config: Record<string, unknown>): { variable: string };
  export function JetBrains_Mono(config: Record<string, unknown>): { variable: string };
  export function Orbitron(config: Record<string, unknown>): { variable: string };
}

declare module "next/image" {
  import * as React from "react";

  const Image: React.ComponentType<Record<string, unknown>>;
  export default Image;
}

declare module "next/link" {
  import * as React from "react";

  const Link: React.ComponentType<Record<string, unknown>>;
  export default Link;
}
