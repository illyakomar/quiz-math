'use client';

import React from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
