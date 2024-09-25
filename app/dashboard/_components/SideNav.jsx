import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react'; // Import icons for mobile toggle

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'My Forms',
      icon: LibraryBig,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Responses',
      icon: MessageSquare,
      path: '/dashboard/responses',
    },
    {
      id: 3,
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade',
    },
  ];

  const { user } = useUser();
  const path = usePathname();
  const [formList, setFormList] = useState([]);
  const [PercFileCreated, setPercFileCreated] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state

  useEffect(() => {
    if (user) {
      GetFormList();
    }
  }, [user]);

  const GetFormList = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(result);

    const perc = (result.length / 3) * 100;
    setPercFileCreated(perc);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0 sm:w-64`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="p-5">
            {/* Sidebar menu items */}
            {menuList.map((menu, index) => (
              <Link
                href={menu.path}
                key={index}
                className={`flex items-center gap-3 p-4 mb-3 rounded-lg text-gray-500
                hover:bg-primary hover:text-white cursor-pointer ${
                  path === menu.path && 'bg-primary text-white'
                }`}
              >
                <menu.icon />
                {menu.name}
              </Link>
            ))}
          </div>

          {/* Footer section for Create Form Button and Progress */}
          <div className="p-5">
            <Button className="w-full mb-4">+ Create Form</Button>
            <Progress value={PercFileCreated} className="w-full" />
            <h2 className="text-sm mt-2 text-gray-600">
              <strong>{formList?.length} </strong>Out of <strong>3</strong> Files Created
            </h2>
            <h2 className="text-sm mt-3 text-gray-600">
              Upgrade your plan for unlimited AI form builds
            </h2>
          </div>
        </div>
      </div>

      {/* Toggle button for mobile */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600 bg-white rounded-md shadow focus:outline-none"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default SideNav;
