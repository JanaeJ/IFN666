import { useState, useEffect } from 'react';
import { Group, Title, TextInput, Button, LoadingOverlay, Container, Paper, Stack, Select, Modal } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import VocabularyCard from '../components/VocabularyCard';
import { useLocation } from 'react-router-dom';
import { vocabularyApi } from '../api/vocabularyApi';
import { courseApi } from '../api/courseApi';
import debounce from 'lodash.debounce';

export default function Vocabularies() {
  const location = useLocation();
  const { courseId: initialCourseId, courseTitle } = location.state || {};

  const [vocabs, setVocabs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(initialCourseId || '');
  const [loading, setLoading] = useState(false);
  const [newWord, setNewWord] = useState({ term: '', translation: '', difficulty: '', course: '' });
  const [editingWord, setEditingWord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await courseApi.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const fetchVocabularies = async () => {
    try {
      console.log("Fetching vocabularies with search query:", searchQuery, "and selected course:", selectedCourse);
      const response = await vocabularyApi.getAll();
      let filteredVocabularies = response.data;

      if (selectedCourse) {
        filteredVocabularies = filteredVocabularies.filter(v => v.course === selectedCourse);
      }

      if (searchQuery) {
        filteredVocabularies = filteredVocabularies.filter(v =>
          v.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.translation.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      console.log("Filtered vocabularies:", filteredVocabularies);
      setVocabs(filteredVocabularies);
    } catch (error) {
      console.error('Failed to load vocabularies:', error);
    }
  };

  // Debounced search function
  const debouncedFetchVocabularies = debounce(() => {
    console.log('Debounced: Fetching vocabularies after debounce delay');
    fetchVocabularies(); 
  }, 500); 


  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    debouncedFetchVocabularies();
  }, [selectedCourse, searchQuery]);

  const handleAddWord = async () => {
    if (!newWord.term || !newWord.translation || !newWord.course) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await vocabularyApi.create({
        word: newWord.term,
        translation: newWord.translation,
        difficulty: newWord.difficulty,
        course: newWord.course,
      });
      await fetchVocabularies();
      setNewWord({ term: '', translation: '', difficulty: '', course: '' });
    } catch (error) {
      console.error('Failed to add word:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await vocabularyApi.delete(id);
      setVocabs(prev => prev.filter(v => v._id !== id));
    } catch (error) {
      console.error('Failed to delete word:', error);
    }
  };

  const handleEdit = (vocab) => {
    setEditingWord(vocab);
    setModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editingWord.word || !editingWord.translation || !editingWord.course) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await vocabularyApi.update(editingWord._id, {
        word: editingWord.word,
        translation: editingWord.translation,
        difficulty: editingWord.difficulty,
        course: editingWord.course,
      });
      await fetchVocabularies();
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to update word:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" py="xl" style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} />

      <Title order={2} align="center" mb="lg">
        {courseTitle ? `Vocabularies for: ${courseTitle}` : 'All Vocabularies'}
      </Title>

      <Group mb="lg" position="apart">
        <Select
          label="Filter by Course"
          placeholder="Select a course"
          data={courses.map(c => ({ value: c._id, label: c.title }))}
          value={selectedCourse}
          onChange={(val) => {
            setSelectedCourse(val || '');
            setNewWord(prev => ({ ...prev, course: val || '' }));
          }}
          style={{ width: '70%' }}
          clearable
        />

        <TextInput
          placeholder="Search by word or translation"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          rightSection={<IconSearch size={16} />}
          style={{ width: '30%' }}
        />
      </Group>

      <Paper shadow="sm" p="md" radius="md" mb="xl">
        <Group mb="md">
          <TextInput
            label="Word"
            placeholder="Enter word"
            value={newWord.term}
            onChange={(e) => setNewWord({ ...newWord, term: e.target.value })}
          />
          <TextInput
            label="Translation"
            placeholder="Enter translation"
            value={newWord.translation}
            onChange={(e) => setNewWord({ ...newWord, translation: e.target.value })}
          />
          <Select
            label="Difficulty"
            placeholder="Select difficulty"
            data={['easy', 'medium', 'hard']}
            value={newWord.difficulty}
            onChange={(val) => setNewWord({ ...newWord, difficulty: val })}
          />
          <Select
            label="Course"
            placeholder="Select course"
            data={courses.map(c => ({ value: c._id, label: c.title }))}
            value={newWord.course}
            onChange={(val) => setNewWord({ ...newWord, course: val })}
          />
          <Button
            leftIcon={<IconPlus size={16} />}
            onClick={handleAddWord}
            loading={loading}
          >
            Add
          </Button>
        </Group>
      </Paper>

      <Stack spacing="md">
        {vocabs.map((vocab) => {
          const course = courses.find(c => c._id === vocab.course);
          return (
            <VocabularyCard
              key={vocab._id}
              word={vocab}
              courseTitle={course?.title || 'Unknown Course'}
              level={vocab.difficulty}
              onDelete={() => handleDelete(vocab._id)}
              onEdit={() => handleEdit(vocab)}
            />
          );
        })}
      </Stack>

      {editingWord && (
        <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Edit Vocabulary">
          <Stack>
            <TextInput
              label="Word"
              value={editingWord.word}
              onChange={(e) => setEditingWord({ ...editingWord, word: e.target.value })}
            />
            <TextInput
              label="Translation"
              value={editingWord.translation}
              onChange={(e) => setEditingWord({ ...editingWord, translation: e.target.value })}
            />
            <Select
              label="Difficulty"
              data={['easy', 'medium', 'hard']}
              value={editingWord.difficulty}
              onChange={(val) => setEditingWord({ ...editingWord, difficulty: val })}
            />
            <Select
              label="Course"
              placeholder="Select course"
              data={courses.map(c => ({ value: c._id, label: c.title }))}
              value={editingWord.course}
              onChange={(val) => setEditingWord({ ...editingWord, course: val })}
            />
            <Group position="right" mt="md">
              <Button onClick={handleEditSubmit}>Save</Button>
            </Group>
          </Stack>
        </Modal>
      )}
    </Container>
  );
}
