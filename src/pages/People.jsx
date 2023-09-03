import { useEffect, useState } from "react"

import { backendUrl } from '../config';
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// eslint-disable-next-line react/prop-types
const UserDialog = ({ handleDialog, fetchUsers }) => {

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    dob: ''
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform any desired actions with the form data here
    console.log(formData);

    const { accessToken } = JSON.parse(localStorage.getItem('user'));

    await fetch(
      `${backendUrl}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': accessToken
        },
        body: JSON.stringify(formData)
      }
    );
    await fetchUsers();
    handleDialog();
  };
  return (
    <div className="dialog" >
      <div
        className="dialog-root"
      >
        <form onSubmit={handleSubmit}>
          <h2>Simple Form</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}



function People() {

  const navigate = useNavigate();


  const [showDialog, setShowDialog] = useState(false);

  const [users, setUsers] = useState([]);

  const [userRole, setRole] = useState('normal');

  const handleDialog = () => {
    if (showDialog) {
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }
  }

  const { accessToken } = JSON.parse(localStorage.getItem('user'));

  const fetchUsers = async () => {
    const response = await fetch(
      `${backendUrl}/users`,
      {
        headers: {
          'auth-token': accessToken
        }
      }
    );
    const data = await response.json();
    setUsers(data);
  }

  const deleteUser = async (userId) => {
    const response = await fetch(
      `${backendUrl}/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'auth-token': accessToken
        }
      }
    );
    await response.json();
    setUsers(users.filter((user) => user.id !== userId));
  }

  useEffect(() => {

    fetchUsers();

    const { accessToken } = JSON.parse(localStorage.getItem('user'));

    const { role } = jwtDecode(accessToken);

    setRole(role);

  }, [])


  return (
    <>
      <div
        style={{
          display: 'flex',
          fontSize: 32
        }}
      >
        <div
          style={{
            flexGrow: 1,
          }}
        >
          List of users in the app
        </div>
        {userRole === 'admin' && <button
          onClick={handleDialog}
        >
          Add New User
        </button>}
        <button
          onClick={() => {
            localStorage.removeItem('user');
            navigate('/login');
          }}
          style={{
            marginLeft: 8,
          }}
        >
          Logout
        </button>
      </div>
      {/* List Users Layout */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {(users || []).map((user) => (
          <div
            style={{
              border: '1px solid',
              margin: 4,
              padding: 4,
              position: 'relative'
            }}
            key={user.id}
          >
            <img src={user.imageUrl} alt={user.name} />
            <h3>{user.name}</h3>
            <h4>{user.dob}</h4>
            {userRole === 'admin' && <i className="fa-solid fa-trash fa-2x" style={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: "white",
              cursor: 'pointer',
            }}
              onClick={() => {
                deleteUser(user.id)
              }} ></i>}
          </div>
        ))}
      </div>

      {showDialog && <UserDialog handleDialog={handleDialog} fetchUsers={fetchUsers} />}
    </>
  )
}

export default People;
