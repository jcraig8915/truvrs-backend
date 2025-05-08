export interface World {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
  is_public: boolean;
  thumbnail_url?: string;
  settings: WorldSettings;
  metadata: WorldMetadata;
}

export interface WorldSettings {
  max_users: number;
  allow_guests: boolean;
  physics_enabled: boolean;
  chat_enabled: boolean;
}

export interface WorldMetadata {
  version: string;
  engine: string;
  size: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
}

export interface WorldCreateInput {
  name: string;
  description: string;
  owner_id: string;
  is_public?: boolean;
  thumbnail_url?: string;
  settings?: Partial<WorldSettings>;
  metadata?: Partial<WorldMetadata>;
}

export interface WorldUpdateInput {
  name?: string;
  description?: string;
  is_public?: boolean;
  thumbnail_url?: string;
  settings?: Partial<WorldSettings>;
  metadata?: Partial<WorldMetadata>;
} 