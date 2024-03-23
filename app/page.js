"use client";
import Link from "next/link";

import { useSession, signIn, signOut } from "next-auth/react";

import { useEffect, useState } from "react";
import AfterLogin from "./AfterLogin";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <AfterLogin />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <div>
        <Link href="./register">Register</Link>
      </div>
    </>
  );
}
