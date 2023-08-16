import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

const signup = (firstname, email, password) => {
  return axios.post(API_URL + "/auth/signup", {
    firstname,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/auth/login", {
        email,
      password,
    })
    .then((response) => {

        console.log("repose data",response.data.data)
      if (response.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const updateProfile = (firstName, lastName, idNumber, email, cellphoneNumber) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log('request',user.data.accessToken)
  if (user && user.data.accessToken) {
    
    const config = {
      headers: {
        Authorization: `Bearer ${user.data.accessToken}`,
      },
    };

    return axios
      .put(
        API_URL + "/user",
        {
          firstName,
          lastName,
          idNumber,
          email,
          cellphoneNumber,
        },
        config
      )
      .then((response) => {
        console.log('request response',response)
        return response.data;
      });
  } else {
    return Promise.reject("User is not authenticated");
  }
};




const updatePreferences = (updatedPreferences) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.data.accessToken) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.data.accessToken}`,
      },
    };

    const preferencesPayload = {
      // Include the updated preferences in the request payload
      emailNotification: updatedPreferences.emailNotifications,
      pushNotification: updatedPreferences.pushNotifications,
    };
    console.log("preferencesPayload", preferencesPayload);
    return axios
      .put(
        API_URL + "/user/preferences", // Make sure to replace with the correct API endpoint
        preferencesPayload, // Include the payload containing updated preferences
        config
      )
      .then((response) => {
        console.log("Request response", response);
        return response.data;
      })
      .catch((error) => {
        console.error("API error", error);
        throw error; // Rethrow the error to handle it in the calling code
      });
  } else {
    return Promise.reject("User is not authenticated");
  }
};



const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  login,
  logout,
  updateProfile,
  updatePreferences
};

export default authService;