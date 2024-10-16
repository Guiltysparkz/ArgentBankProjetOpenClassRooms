export const GET_LOGIN = 'GET_LOGIN';

export const login = (email, password, rememberMe) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      dispatch({
        type: GET_LOGIN,
        payload: {
          firstName: data.body.firstName,
          lastName: data.body.lastName,
          userName: data.body.userName,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const UPDATE_USERNAME = 'UPDATE_USERNAME';

export const editUsername = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();

      dispatch({
        type: UPDATE_USERNAME,
        payload: data.body.userName,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const CHECK_AUTH = 'CHECK_AUTH';
export const CHECK_AUTH_REQUEST = 'CHECK_AUTH_REQUEST';
export const CHECK_AUTH_FAILURE = 'CHECK_AUTH_FAILURE'; // Define failure state

export const checkAuth = () => {
  return async (dispatch) => {
    dispatch({ type: CHECK_AUTH_REQUEST });

    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: CHECK_AUTH,
          payload: {
            isAuthenticated: true,
            firstName: data.body.firstName,
            lastName: data.body.lastName,
            userName: data.body.userName,
          },
        });
      } else if (response.status === 401) {
        // Not authenticated, explicitly set to false
        dispatch({
          type: CHECK_AUTH,
          payload: {
            isAuthenticated: false,
          },
        });
      } else {
        console.error('Failed to check authentication:', response.statusText);
        dispatch({
          type: CHECK_AUTH_FAILURE, // Failure action for other status codes
          payload: {
            isAuthenticated: false,
            error: response.statusText,
          },
        });
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      dispatch({
        type: CHECK_AUTH_FAILURE, // Failure action for exceptions
        payload: {
          isAuthenticated: false,
          error: error.message,
        },
      });
    }
  };
};

export const LOGOUT = 'LOGOUT';

export const logout = () => {
  return async (dispatch) => {
    try {
      await fetch('http://localhost:3001/api/v1/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      dispatch({ type: LOGOUT });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
};
