import React, { useState, useEffect } from "react";
import { PageLoader } from "../../common/loader";
import Pagination from "../../common/Pagination";
import { getAllUsers } from "../../api/auth";
import { SimpleButton } from "../../common/buttons";

const Users = () => {
  const pageLimit = 10;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const { users, totalUsers } = await getAllUsers(page, pageLimit);
      setLoading(false);
      if (users && users.length > 0) {
        setUsers(users);
        setTotalUsers(totalUsers);
      } else {
        if (page > 1) {
          setPage((p) => p - 1);
          setLoading(true);
        }
      }
    };

    loading && getUsers();
  }, [page, loading]);

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
        <div>
          <div className="contact-table">
            <table className="w-full">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Contact Number</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => {
                  const { firstName, lastName, email, contact } = user;
                  return (
                    <tr key={index}>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{email}</td>
                      <td>{contact}</td>
                      <td>
                        <div className="py-2">
                          <SimpleButton
                            label="Details"
                            handleClick={() => {}}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {totalUsers / pageLimit > 1 && (
            <div className="py-10">
              <Pagination
                activePage={page}
                setActivePage={(page) => {
                  setPage(page);
                  setLoading(true);
                }}
                totalItems={totalUsers}
                numberOfItemsToDisplayInAPage={pageLimit}
                handleScroll={() => window.scrollTo(0, 0)}
              />
            </div>
          )}
        </div>
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
