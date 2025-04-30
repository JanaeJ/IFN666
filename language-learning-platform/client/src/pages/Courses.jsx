import React, { useState, useEffect } from 'react';
import {
  Container, SimpleGrid, Title, LoadingOverlay, Button, Card,
  Stack, Modal, TextInput, Group
} from '@mantine/core';
import CourseCard from '../components/CourseCard';
import { courseApi } from '../api/courseApi';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: '', language: '', level: '' });
  const [editId, setEditId] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) loadCourses();
  }, [user]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const response = await courseApi.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('加载课程失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewVocabulary = (courseId) => {
    navigate(`/vocabularies/${courseId}`);
  };

  const handleOpenModal = (course = null) => {
    if (course) {
      setForm({ title: course.title, language: course.language, level: course.level });
      setEditMode(true);
      setEditId(course._id);
    } else {
      setForm({ title: '', language: '', level: '' });
      setEditMode(false);
      setEditId(null);
    }
    setModalOpened(true);
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await courseApi.update(editId, form);
      } else {
        await courseApi.create({ ...form, createdBy: user._id });
      }
      await loadCourses();
      setModalOpened(false);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course？')) return;
    try {
      await courseApi.delete(id);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <Container size="lg" py="xl" style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />

      <Group position="apart" mb="md">
        <Title order={2}>Available Courses</Title>
        {user?.role === 'admin' && (
          <Button onClick={() => handleOpenModal()}>Create Course</Button> // Move the create button here for admin only
        )}
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {courses.map((course) => (
          <Card key={course._id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack spacing="sm">
              <CourseCard course={course} />
              {user?.role === 'admin' && ( // Only admin can edit or delete
                <Group grow>
                  <Button color="blue" onClick={() => handleOpenModal(course)}>Edit</Button>
                  <Button color="red" onClick={() => handleDelete(course._id)}>Delete</Button>
                </Group>
              )}
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal for Add/Edit */}
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={editMode ? 'Edit Course' : 'Create Course'}
      >
        <Stack>
          <TextInput label="Course Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <TextInput label="Language" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} />
          <TextInput label="Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
          <Button onClick={handleSave}>
            {editMode ? 'Save Changes' : 'Create Course'}
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}
