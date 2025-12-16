  // src/components/Dashboard/Dashboard.jsx
  import React, { useState } from 'react';
  import { MENU_ITEMS, BG_COLOR } from './Layout/constants';
  import Sidebar from './Layout/Sidebar'; 
  import Header from './Layout/Header'; 
  import DashboardContent from './DashboardContent';

  const Master = ({ initialMenuId = 'dashboard' }) => {

  const [activeMenuId, setActiveMenuId] = useState(initialMenuId);
    
    // 🎯 STATE BARU: Untuk mengontrol visibilitas sidebar di mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const handleMenuClick = (id) => {
    setActiveMenuId(id);
  };
    
    // 🎯 FUNGSI BARU: Untuk membuka/menutup sidebar
    const handleToggleSidebar = () => {
      setIsSidebarOpen(prev => !prev);
    };
    
    // 🎯 FUNGSI BARU: Untuk menutup sidebar (dipanggil dari Sidebar.jsx)
    const handleCloseSidebar = () => {
      setIsSidebarOpen(false);
    };


  const activeMenu = MENU_ITEMS.find((item) => item.id === activeMenuId);
  const activeMenuLabel = activeMenu ? activeMenu.label : 'dashboard';

  const renderContent = () => {
    switch (activeMenuId) {
    case 'dashboard':
      return <DashboardContent />;
    //  case 'kib':
    //   return (
    //    <DataIndukContent
      
    //    />
    //   );
    //  case 'AddData':
    //   return <AddData />;
    //  case 'reports':
    //   return <LaporanKIRContent />;
    //  case 'addData':
    //   return <AddDataKir />;
    //  case 'print_labels':
    //   return <PrintLabelsContent />;
    //  case 'laporan':
    //   return <Laporan />;
    //  case 'user':
    //   return <UserContent />;
        default:
          return <DashboardContent />;
    }
  };

  return (
    <div className={`flex min-h-screen font-sans bg-${BG_COLOR}`}>
    {/* Sidebar disembunyikan saat print */}
    <div className="print:hidden">
  <Sidebar 
            activeMenuId={activeMenuId} 
            onMenuItemClick={handleMenuClick} 
              isOpen={isSidebarOpen} // Meneruskan state
            onClose={handleCloseSidebar} // Meneruskan fungsi penutup
          />
    </div>

    <div className="flex-1 flex flex-col">
      {/* Header juga disembunyikan saat print */}
      <div className="print:hidden">
      <Header 
              activeMenuLabel={activeMenuLabel} 
              onToggleSidebar={handleToggleSidebar} // Meneruskan fungsi toggle
            />
      </div>

      {/* main tetap, isi komponen yang atur sendiri apa yang ke-print */}
      <main className="p-8 flex-1">{renderContent()}</main>

      {/* footer juga disembunyikan saat print */}
      <footer className="p-4 text-center text-xs text-gray-500 border-t border-gray-200 print:hidden">
      &copy; 2025 SIMBADA Kecamatan Bandung Kidul. All rights reserved. V1.4.0
      </footer>
    </div>
    </div>
  );
  };

  export default Master;