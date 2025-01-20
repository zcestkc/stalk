import { ReactNode } from 'react';
import DashboardLayout from './_components/dashboard-layout';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default AppLayout;
