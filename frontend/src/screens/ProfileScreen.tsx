import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useAppSelector, useAppDispatch } from '../hooks';
import { updateUserProfile } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Pre-fill the form with the logged-in user's data
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // We'll add a better notification (toast) later
      alert('Passwords do not match');
    } else {
      // Fix: import and use dispatch and updateUserProfile
      // Import useDispatch and updateUserProfile at the top of the file:
      // import { useDispatch } from 'react-redux';
      // import { updateUserProfile } from '../slices/userSlice';
      // Now dispatch the action:
      // Only include password if it is not empty
      const updateData: { name: string; email: string; password?: string } = { name, email };
      if (password) {
        updateData.password = password;
      }
      dispatch(updateUserProfile(updateData));
      // We can add a "Profile Updated!" success message here later
      // (Make sure to define and use dispatch properly)
    }
  };
   

  return (
    <FormContainer>
      <h1>User Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;