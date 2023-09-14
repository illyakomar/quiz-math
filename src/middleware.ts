import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(request) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (token === null) {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/created/:path*', '/active', '/completed'],
};
