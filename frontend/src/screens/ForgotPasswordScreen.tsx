import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useForgotPasswordMutation } from '../slices/usersApiSlice';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, isSuccess, error }] = useForgotPasswordMutation();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      <p>Enter your email address to receive a password reset link.</p>
      {isSuccess && <Message variant="success">Reset link sent to your email.</Message>}
      {error && (
        <Message variant="danger">
          {'data' in error && (error.data as { message: string }).message}
        </Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Submit
        </Button>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;