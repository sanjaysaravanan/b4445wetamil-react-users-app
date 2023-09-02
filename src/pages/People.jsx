import { useEffect, useState } from "react"

import { backendUrl } from '../config';
import { useNavigate } from "react-router-dom";

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

    await fetch(
      `${backendUrl}/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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

  const handleDialog = () => {
    if (showDialog) {
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }
  }

  const fetchUsers = async () => {
    const response = await fetch(`${backendUrl}/users`);
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {

    fetchUsers();

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
        <button
          onClick={handleDialog}
        >
          Add New User
        </button>
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
              padding: 4
            }}
            key={user.id}
          >
            <img src={user.imageUrl} alt={user.name} />
            <h3>{user.name}</h3>
            <h4>{user.dob}</h4>
          </div>
        ))}
      </div>

      {showDialog && <UserDialog handleDialog={handleDialog} fetchUsers={fetchUsers} />}
    </>
  )
}

export default People;
