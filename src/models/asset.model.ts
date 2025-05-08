export interface Asset {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
  type: AssetType;
  url: string;
  thumbnail_url?: string;
  metadata: AssetMetadata;
}

export type AssetType = '3d_model' | 'texture' | 'audio' | 'script' | 'other';

export interface AssetMetadata {
  file_size: number;
  file_type: string;
  dimensions?: {
    width: number;
    height: number;
    depth?: number;
  };
  duration?: number; // For audio/video assets
  format_version?: string;
  tags: string[];
}

export interface AssetCreateInput {
  name: string;
  description: string;
  owner_id: string;
  type: AssetType;
  url: string;
  thumbnail_url?: string;
  metadata: Partial<AssetMetadata>;
}

export interface AssetUpdateInput {
  name?: string;
  description?: string;
  thumbnail_url?: string;
  metadata?: Partial<AssetMetadata>;
} 