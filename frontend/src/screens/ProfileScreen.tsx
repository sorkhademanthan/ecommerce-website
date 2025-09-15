import { useState, useEffect } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useUpdateUserMutation } from '../slices/usersApiSlice'; // Corrected hook name
import { useUploadProductImageMutation } from '../slices/productsApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        alert('Profile updated successfully');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      formData.append('image', e.target.files[0]);
      formData.append('folder', 'avatars');
      try {
        const res = await uploadProductImage(formData).unwrap();
        const updateRes = await updateProfile({
          _id: userInfo?._id,
          avatar: res.imageUrl,
        }).unwrap();
        dispatch(setCredentials(updateRes));
        alert('Avatar updated');
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <FormContainer>
      <h1>User Profile</h1>
      <div className="text-center my-3">
        <Image src={userInfo?.avatar || '/images/default-avatar.png'} roundedCircle width={150} height={150} />
      </div>
      <Form.Group controlId="avatar" className="my-3">
        <Form.Label>Change Avatar</Form.Label>
        <Form.Control type="file" onChange={uploadFileHandler} />
        {loadingUpload && <Loader />}
      </Form.Group>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        
        {/* Added missing password fields */}
        <Form.Group controlId="password"  className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="confirmPassword"  className="my-2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>
        
        <Button type="submit" variant="primary" className="mt-2">
          Update Profile
        </Button>
        {loadingUpdate && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;