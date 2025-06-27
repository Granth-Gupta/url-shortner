import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        {/* header */}
        <Outlet />
      </main>

      <div>Made with ❤️ by Granth</div>
    </div>
  );
};

export default AppLayout;
