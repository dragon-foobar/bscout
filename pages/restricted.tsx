import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
// import { nextauthOptions } from "@/lib/nextauthOptions";
// import { getServerSession } from "next-auth/next";
import React from "react";

export default function RestrictedPage() {
  return <div>RestrictedPage</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // get the session
  const session = await getSession({ req });

  // redirect to signin if there is no session.
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin'
      }
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: `/${session.user.username}`
    }
  };
};
