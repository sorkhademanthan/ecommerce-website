import { useEffect } from 'react';
import { useGetMeQuery } from '../slices/usersApiSlice';
import { useAppDispatch } from '../hooks';
import { setCredentials } from '../slices/authSlice'; // We need to create this reducer

const Startup = () => {
  const { data: userInfo } = useGetMeQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(setCredentials(userInfo));
    }
  }, [userInfo, dispatch]);

  // This component doesn't render anything
  return null;
};

export default Startup;