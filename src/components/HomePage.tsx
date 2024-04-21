import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/homePage.css";

const App = () => {
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    pincode: "",
    mobile_number: "",
    email: "",
    website: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editRestaurantIndex, setEditRestaurantIndex] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleAddRestaurantBtn = () => {
    setShowAddNewForm(true);
    setEditMode(false);
    setNewRestaurant({
      name: "",
      address: "",
      pincode: "",
      mobile_number: "",
      email: "",
      website: "",
    });
  };

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/restaurants/edit/${editRestaurantIndex}`,
          newRestaurant
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/restaurants/addData",
          newRestaurant
        );
      }
      fetchRestaurants();
    } catch (error) {
      console.error("Error adding/updating restaurant:", error);
      alert(
        "Failed to connect to backend, make sure the express server is up and running and you have valid access to it"
      );
    }
    setShowAddNewForm(false);
  };

  const handleDeleteRestaurant = async (index) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/restaurants/delete/${index}`
      );
      fetchRestaurants();
      alert("Delete successful");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleEditRestaurant = (index) => {
    setShowAddNewForm(true);
    setEditMode(true);
    setEditRestaurantIndex(index);
    setNewRestaurant(restaurants[index]);
  };
  const handleCancelBtn = () => {
    setEditMode(false);
    setShowAddNewForm(false);
  };

  return (
    <>
      <div className="container">
        <h1>Restaurants Data</h1>
        {showAddNewForm && (
          <div className="resForm">
            <div className="resForm-content">
              <h2>{editMode ? "Edit Restaurant" : "Add New Restaurant"}</h2>
              <form className="form" onSubmit={handleAddRestaurant}>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={newRestaurant.name}
                  onChange={(e) =>
                    setNewRestaurant({ ...newRestaurant, name: e.target.value })
                  }
                />
                {/* <span>*required</span> */}
                <input
                  type="text"
                  placeholder="Address"
                  value={newRestaurant.address}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      address: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Pincode"
                  value={newRestaurant.pincode}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      pincode: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Mobile Number"
                  value={newRestaurant.mobile_number}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      mobile_number: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newRestaurant.email}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  // type="url"
                  type="text"
                  placeholder="Website"
                  value={newRestaurant.website}
                  onChange={(e) =>
                    setNewRestaurant({
                      ...newRestaurant,
                      website: e.target.value,
                    })
                  }
                />
                <button className="btn" type="submit">
                  {editMode ? "Update" : "Add"}
                </button>
                <button className="btn" onClick={handleCancelBtn}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="restaurants-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Website</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => (
                <tr key={index}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.pincode}</td>
                  <td>{restaurant.mobile_number}</td>
                  <td>{restaurant.email}</td>
                  <td>{restaurant.website}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleEditRestaurant(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDeleteRestaurant(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" AddResBtn">
          <button onClick={handleAddRestaurantBtn}>Add Restaurant</button>
        </div>
      </div>
    </>
  );
};

export default App;
