import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Alert,
  Card,
  Stack,
  Title,
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';
import { userApi } from '../api/userApi'; // ✅ 引入封装的 API

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const validateInputs = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await userApi.login({ username, password }); // ✅ 使用封装 API
      const { token, user } = res.data;

      // ✅ 保存 token 和用户信息
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      // ✅ 登录成功后跳转
      if (user.role === 'admin') {
        navigate('/users');
      } else {
        navigate('/courses');
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: err.response?.data?.error || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  // ✅ 如果已登录，防止重复跳转
  if (user) {
    if (user.role === 'admin') {
      navigate('/users');
    } else {
      navigate('/courses');
    }
    return null;
  }

  return (
    <Container size="xs" py="xl">
      <Card shadow="md" padding="xl" radius="lg" withBorder>
        <Stack spacing="md">
          <Title order={2} ta="center">Login</Title>
          {errors.form && <Alert color="red">{errors.form}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              mt="sm"
            />
            <Button type="submit" fullWidth loading={loading} mt="md">
              Login
            </Button>
          </form>
        </Stack>
      </Card>
    </Container>
  );
};

export default Login;
