import { useUser } from "../../context/UserContext";
import UserCard from "./UserCard";
function UsersList() {
  const { filteredUsers } = useUser();
  return (
    <div className="h-full shadow-xl rounded-xl border-2 border-secondary pb-2 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4">
        {filteredUsers.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
}

export default UsersList;
