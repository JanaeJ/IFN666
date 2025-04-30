import { useEffect, useState } from 'react';
import {
  TextInput,
  Button,
  Container,
  Title,
  Stack,
  Alert,
  LoadingOverlay
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';

const UserEdit = () => {
  const { id } = useParams(); // 获取 URL 中的用户 ID
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 在组件加载时获取用户信息
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await userApi.getUserById(id); // 根据 ID 获取用户信息
        setUser(response.data);
      } catch (err) {
        setError('Failed to load user data');
      }
    };
    loadUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 提交更新，只更新用户名
      await userApi.update(id, { username: user.username });
      navigate('/users'); // 更新成功后跳转到用户列表页
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  // 如果用户信息尚未加载，显示加载中
  if (!user) return (
    <Container>
      <LoadingOverlay visible />
    </Container>
  );

  return (
    <Container size="xs" py="xl" style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Title order={2}>Edit User</Title>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <TextInput
            label="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })} // 修改用户名
            required
          />
          <Button 
            type="submit" 
            fullWidth
            loading={loading}
          >
            Save Changes
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default UserEdit;
