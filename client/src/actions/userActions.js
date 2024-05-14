export const SET_EMAIL = 'SET_EMAIL';
export const SET_USER_TYPE = 'SET_USER_TYPE'; 
export const SET_USER_NAME= 'SET_USER_NAME';
export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};
