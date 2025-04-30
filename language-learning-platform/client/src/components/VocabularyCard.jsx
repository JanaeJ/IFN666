import { useState } from 'react';
import { Card, Group, Text, Button, Collapse, Divider, Stack } from '@mantine/core';
import { IconTrash, IconEdit, IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function VocabularyCard({ word, courseTitle, onDelete, onEdit }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card withBorder shadow="sm" p="md" radius="md" onClick={() => setExpanded((v) => !v)} style={{ cursor: 'pointer' }}>
      <Group position="apart">
        <Text weight={600}>{word.word} - {word.translation}</Text>
        {expanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
      </Group>

      <Collapse in={expanded}>
        <Divider my="sm" />
        <Stack spacing={4}>
          <Text size="sm"><strong>语言：</strong>{word.language || '未填写'}</Text>
          <Text size="sm"><strong>难度：</strong>{word.difficulty || '未设定'}</Text>
          <Text size="sm"><strong>课程：</strong>{courseTitle || '未知课程'}</Text>
        </Stack>

        <Group spacing="xs" mt="md" position="right">
          <Button
            size="xs"
            variant="light"
            color="blue"
            leftIcon={<IconEdit size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
          >
            编辑
          </Button>
          <Button
            size="xs"
            variant="light"
            color="red"
            leftIcon={<IconTrash size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            删除
          </Button>
        </Group>
      </Collapse>
    </Card>
  );
}
