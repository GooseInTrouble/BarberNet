"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProfileButton() {
  const { data: session } = useSession();

  const [clickState, setClickState] = useState<boolean>();

  const entryStyle = "block px-4 py-2 text-sm text-gray-700";

  const menuPanel = (
    <div className="absolute right-5 z-10 mt-2 w-47 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
      {/* <span className={entryStyle}>{session?.user?.name ?? "Guest"}</span>
      <hr /> */}
      {session ? (
        <>
          <button className={entryStyle} onClick={() => signOut()}>
            Sign out
          </button>
          <Link className={entryStyle} href="/profile">
            Your Profile
          </Link>
          <Link className={entryStyle} href="/catalog?liked">
            Favorites
          </Link>
        </>
      ) : (
        <>
          <button className={entryStyle} onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
    </div>
  );

  return (
    <div>
      <Image
        src={session?.user?.image ?? "/placeholder.jpg"}
        alt="User profile icon"
        className="rounded-full m-3 hover:cursor-pointer"
        width={50}
        height={50}
        onClick={() => setClickState(!clickState)}
      />
      {clickState && menuPanel}
    </div>
  );
}
