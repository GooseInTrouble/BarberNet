'use client';

import UserAppointments from './UserAppointments';

const UserAppointmentsPage = () => {
  const userId = 'user123';

  return (
    <div className="container mx-auto">
      <UserAppointments userId={userId} />
    </div>
  );
};

export default UserAppointmentsPage;
