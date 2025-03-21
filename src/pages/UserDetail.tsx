import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";

const UserDetail = () => {
  const { id } = useParams();
  const user = useAppSelector((state) =>
    state.users.users.find((u) => u.id === id)
  );

  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl">Resume View</h2>
      <p>
        <strong>Name:</strong> {user.firstName} {user.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
    </div>
  );
};

export default UserDetail;
