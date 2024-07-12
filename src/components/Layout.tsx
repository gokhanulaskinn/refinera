// src/components/Layout.tsx

import Appbar from './Appbar';
import Sidebar from './Sidebar';

const Layout = (props: { children: any }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', paddingLeft: 270 }}> {/* Header yüksekliğine göre ayarla */}
        <Appbar />
        <main style={{ flexGrow: 1, padding: '24px' }}>
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
