import { useUser } from "contexts/userContext";
import React from "react";

const Profile: React.FC = () => {
  const { user } = useUser();

  return <div>{user?.email}</div>;
};

export default Profile;
