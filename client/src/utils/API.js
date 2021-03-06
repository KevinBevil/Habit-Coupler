import axios from "axios";

export default {
  // Gets all Users
  getUsers: function() {
    return axios.get("/api/user");
  },
  // Gets the User with the given id
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the User with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a User to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },
  getHabits: function() {
    return axios.get("/api/habit");
  },
  saveHabit: function(habit) {
    return axios.post("/api/habit", habit);
  },
  deletePair: function(id) {
    return axios.delete("/api/user/habits/" + id)
    .then(function(res) {
      return res.data
    })
  },
  updateHabits: function(id, data) {
    return axios.put("/api/user/habits/" + id, data)
    .then(function(res) {
      return res.data
    });
  },
  deleteHabit: function(habit) {
    return axios.delete("/api/habit/" + habit);
  }
};
