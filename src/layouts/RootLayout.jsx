import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="app">
      <header className="app-header">
        {/* Navigation will be added in Milestone 1 */}
      </header>
      <main className="app-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        {/* Footer content will be added later */}
      </footer>
    </div>
  );
};

export default RootLayout;
