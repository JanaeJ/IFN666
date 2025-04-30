import { useEffect, useState } from 'react';
import { Table, Button, Group, Container, Title, Alert, LoadingOverlay } from '@mantine/core';
import { userApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/home');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await userApi.getAll(); // 请求用户列表
        setUsers(res.data);
      } catch (err) {
        setError('Failed to fetch user list');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userApi.delete(id);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      setError('Deletion failed. Please try again.');
    }
  };

  return (
    <Container size="md" py="xl" style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />
      <Title order={2}>User Management</Title>
      
      {error && <Alert color="red">{error}</Alert>}

      {/* 添加按钮，跳转到课程管理页面 */}
      <Button 
        onClick={() => navigate('/courses')} 
        variant="outline" 
        mb="md"
      >
        Go to Course Management
      </Button>

      <Table highlightOnHover withBorder mt="md">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Group spacing="xs">
                  <Button 
                    size="xs" 
                    variant="outline" 
                    onClick={() => navigate(`/users/edit/${user._id}`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="xs" 
                    color="red" 
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
