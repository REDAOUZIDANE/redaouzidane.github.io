export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  is_admin: boolean;
  created_at: string;
};

export type Room = {
  id: string;
  client_id: string;
  name: string;
  created_at: string;
};

export type Message = {
  id: string;
  room_id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export type FileRecord = {
  id: string;
  room_id: string;
  storage_path: string;
  file_name: string;
  size_bytes: number | null;
  uploaded_by: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; email: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      rooms: {
        Row: Room;
        Insert: Partial<Room> & { client_id: string };
        Update: Partial<Room>;
        Relationships: [];
      };
      messages: {
        Row: Message;
        Insert: Partial<Message> & { room_id: string; sender_id: string; body: string };
        Update: Partial<Message>;
        Relationships: [];
      };
      files: {
        Row: FileRecord;
        Insert: Partial<FileRecord> & {
          room_id: string;
          storage_path: string;
          file_name: string;
          uploaded_by: string;
        };
        Update: Partial<FileRecord>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
