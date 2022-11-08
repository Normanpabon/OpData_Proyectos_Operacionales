import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import AdminNavBar from "../../components/admin/AdminNavBar";
import Footer from "../../components/common/Footer";
function AdminMainPage() {
  const { getUnits, getUsers, getProjects, getAllStatus } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUnits().then(
      getUsers().then(
        getAllStatus().then(() => {
          setLoading(false);
        })
      )
    );
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <AdminNavBar />
      <main className="flex flex-row flex-1 relative">
        <section className="w-full px-10 pt-2 pb-5 flex flex-col grow">
          {loading ? "Loading" : <Outlet />}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminMainPage;
