// src/pages/[userId].tsx

import { getSession } from 'next-auth/react';
import UserAppointmentsPage from '@/app/userAppointments/page';
import { GetServerSidePropsContext } from 'next';
type UserSession = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
  export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);
  
    if (!session || !session.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    const userSession: UserSession = session.user;
    return {
      props: {
        userId: userSession.email,
      },
    };
  }
  
  export default UserAppointmentsPage;
  
