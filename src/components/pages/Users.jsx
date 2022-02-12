import React, { useState, useEffect } from "react";
import UserDataTable from "../../ui/table/UserDataTable";
import { PageLoader } from "../../common/loader";
import { getAllUsers } from "../../api/auth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const { users } = await getAllUsers();
      if (mounted) {
        setLoading(false);
        if (users && users.length > 0) {
          setUsers(users);
        }
      }
    };

    loading && getUsers();
  }, [loading, mounted]);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center h-96">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {users.length > 0 && (
        <UserDataTable users={users} setLoading={setLoading} />
      )}

      {users.length === 0 && (
        <div className="py-4 text-lg font-semibold text-gray-600">
          There are no users yet.
        </div>
      )}
    </div>
  );
};

export default Users;
