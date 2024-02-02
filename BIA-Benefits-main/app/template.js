"use client";

import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';


export default function PostLayout({
  children, // will be a page or nested layout
}) {
  return <SessionProvider>
    {children}

    </SessionProvider>;
}