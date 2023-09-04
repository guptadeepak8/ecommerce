import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectloggedInUser, signOutUserAsync } from '../store/Auth/authSlice';

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);

  useEffect(() => {
    dispatch(signOutUserAsync());
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;