import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note } from '../types/note';

const apiClient = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

apiClient.interceptors.request.use(config => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  page?: number;
  query?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await apiClient.get('/notes', {
    params: {
      page: params.page || 1,
      search: params.query || '',
      perPage: params.perPage || 12,
    },
  });
  return response.data;
};

export const createNote = async (noteData: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.post('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await apiClient.delete(`/notes/${noteId}`);
  return response.data;
};