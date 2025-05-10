// userReducer.js

const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
const user = JSON.parse(sessionStorage.getItem('user'));


// userReducer.js
const initialState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
    user: JSON.parse(sessionStorage.getItem('user')) || null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('user', JSON.stringify(action.payload));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case 'LOGOUT_USER':
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('user');
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
  