import { Card, Text, Badge, Group, Avatar, ActionIcon, Button, Stack } from '@mantine/core';
import { IconBookmark, IconShare, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  const languageColors = {
    English: 'blue',
    Spanish: 'orange',
    French: 'indigo',
    Chinese: 'red',
    Japanese: 'green',
    German: 'yellow',
    Korean: 'purple',
  };

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  const handleViewVocabulary = () => {
    navigate(`/vocabularies?courseId=${course._id}&courseTitle=${encodeURIComponent(course.title)}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack spacing="xs">
        <Group position="apart">
          <Text weight={600} size="lg">
            {course.title}
          </Text>
          <Badge color={languageColors[course.language] || 'gray'} size="sm">
            {course.language}
          </Badge>
        </Group>

        <Group spacing="xs">
          <Badge color="teal" variant="light">
            {levelLabels[course.level] || course.level}
          </Badge>
          <Group spacing={4}>
            <Avatar size="xs" radius="xl" color="cyan">
              <IconUser size={14} />
            </Avatar>
            <Text size="xs" color="dimmed">
              Instructor: {course.createdBy.slice(-4)}
            </Text>
          </Group>
        </Group>

        <Group position="apart" mt="xs">
          <Group spacing="xs">
            <ActionIcon variant="light" color="blue" radius="md">
              <IconBookmark size={16} />
            </ActionIcon>
            <ActionIcon variant="light" color="green" radius="md">
              <IconShare size={16} />
            </ActionIcon>
          </Group>
          <Button size="xs" variant="light" onClick={handleViewVocabulary}>
            View Vocabulary
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
