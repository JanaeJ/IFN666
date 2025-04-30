import { useState } from 'react';
import {
  AppShell, Burger, Title, Button, Box,
  Header, NavLink, Group, MediaQuery, Space,
  Container // Added Container for responsive content
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const [opened, setOpened] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppShell
      padding={{ base: 'sm', md: 'md' }} // Responsive padding
      header={
        <Header height={{ base: 50, md: 60 }} px="md"> {/* Responsive header height */}
          <Group position="apart" style={{ height: '100%' }}>
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  mr="xl"
                />
              </MediaQuery>
              <Title 
                order={{ base: 5, md: 4 }} // Responsive title size
                style={{ cursor: 'pointer' }} 
                onClick={() => navigate('/')}
              >
                Language Learning App
              </Title>
            </Group>

            <Group spacing={{ base: 4, sm: 'xs' }}> {/* Responsive button spacing */}
              {user ? (
                <>
                  <Button 
                    variant="subtle" 
                    onClick={() => navigate('/courses')}
                    size={{ base: 'xs', sm: 'sm' }} // Responsive button size
                  >
                    Courses
                  </Button>
                  <Button 
                    variant="outline" 
                    color="red" 
                    onClick={logout}
                    size={{ base: 'xs', sm: 'sm' }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="default" 
                    onClick={() => navigate('/login')}
                    size={{ base: 'xs', sm: 'sm' }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="light" 
                    onClick={() => navigate('/register')}
                    size={{ base: 'xs', sm: 'sm' }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Group>
          </Group>
        </Header>
      }
    >
      <Container 
        size={{ 
          base: '100%',  // Full width on mobile
          sm: '90%',     // 90% width on tablet
          lg: '80%',     // 80% width on small desktop
          xl: '1200px'   // Fixed width on large screens
        }}
        px={{ base: 0, sm: 'md' }} // Horizontal padding
      >
        {children}
      </Container>
    </AppShell>
  );
}