import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin — Wanderlust',
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex pt-[72px]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
