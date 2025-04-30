import React from 'react';
import {
  Title,
  Button,
  Stack,
  Card,
  Container,
  Text,
  Center,
  Space,
} from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container size="xs" py="xl">
      <Center mb="lg">
        <Title order={1} ta="center">
          Language Learning App
        </Title>
      </Center>

      <Card shadow="md" radius="lg" withBorder padding="xl">
        <Stack spacing="md" align="center">
          <Title order={3} ta="center">
            Welcome!
          </Title>
          <Text align="center" color="dimmed" size="sm">
            Start your journey by logging in or registering a new account.
          </Text>

          <Stack spacing="sm" w="100%">
            <Button
              component={Link}
              to="/login"
              fullWidth
              size="md"
              variant="filled"
              color="indigo"
              radius="md"
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              fullWidth
              size="md"
              variant="outline"
              color="indigo"
              radius="md"
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </Card>
      <Space h="xl" />
    </Container>
  );
}
