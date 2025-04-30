import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Alert,
  Select,
  Container,
  Card,
  Stack,
  Title,
  Text,
  Space,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 客户端验证
  const validateInputs = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters and numbers';
    }
    
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.toLowerCase(), password, role }),
      });

      const data = await response.json();

      if (response.status === 201) {
        navigate('/login');
      } else {
        // 处理后端返回的验证错误
        if (data.errors) {
          const backendErrors = {};
          data.errors.forEach(err => {
            backendErrors[err.path] = err.msg;
          });
          setErrors(backendErrors);
        } else {
          setErrors({ form: data.error || 'Registration failed' });
        }
      }
    } catch (err) {
      setErrors({ form: 'Network error, please try again' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" py="xl">
      <Card shadow="md" radius="lg" padding="xl" withBorder>
        <Stack spacing="md">
          <Title order={2} ta="center">
            Create an Account
          </Title>
          <Text size="sm" color="dimmed" ta="center">
            Fill in the form to register a new user
          </Text>

          {errors.form && <Alert color="red">{errors.form}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <TextInput
                label="Username"
                placeholder="Enter your username (letters and numbers only)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={errors.username}
                required
                radius="md"
              />

              <PasswordInput
                label="Password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
                radius="md"
              />

              <Select
                label="Role"
                data={[
                  { value: 'user', label: 'Regular User' },
                  { value: 'admin', label: 'Administrator' },
                ]}
                value={role}
                onChange={setRole}
                required
                radius="md"
              />

              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="md"
                radius="md"
                color="indigo"
              >
                Create Account
              </Button>
            </Stack>
          </form>
        </Stack>
      </Card>
      <Space h="lg" />
    </Container>
  );
};

export default Register;