import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import AdminNavBar from "../../components/admin/AdminNavBar";
import Footer from "../../components/common/Footer";
function AdminMainPage() {
  const { getUnits, getUsers, getAllStatus, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getUnits()
      .then(
        getUsers()
          .then(
            getAllStatus()
              .then(() => {
                setLoading(false);
              })
              .catch(() => {
                setUser(null);
                navigate("/serverDown");
              })
          )
          .catch(() => {
            setUser(null);
            navigate("/serverDown");
          })
      )
      .catch(() => {
        setUser(null);
        navigate("/serverDown");
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <AdminNavBar />
      <main className="flex flex-row flex-1 relative">
        {loading ? "Loading" : <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

export default AdminMainPage;
