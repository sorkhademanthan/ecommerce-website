import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useResetPasswordMutation } from '../slices/usersApiSlice';

const ResetPasswordScreen = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading, isSuccess, error }] = useResetPasswordMutation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      if (!token) {
        alert('Invalid or missing token.');
        return;
      }
      try {
        await resetPassword({ token, password }).unwrap();
        alert('Password reset successfully');
        navigate('/login');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {isSuccess && <Message variant="success">Password has been reset.</Message>}
      {error && (
        <Message variant="danger">
          {'data' in error && (error.data as { message: string }).message}
        </Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3" disabled={isLoading}>
          Reset Password
        </Button>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;