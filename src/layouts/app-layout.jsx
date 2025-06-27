import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        {/* header */}
        <Outlet />
      </main>

      <div className="p-10 text-center by-gray-800 mt-10">
        Made with ❤️ by Granth
      </div>
    </div>
  );
};

export default AppLayout;
