export const CONSTANTS = {
  // Authentication
  AUTH: {
    TOKEN_TYPE: 'Bearer',
    REFRESH_TOKEN_EXPIRES_IN: '7d',
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 100,
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  // File Upload
  UPLOAD: {
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_MODEL_TYPES: ['model/gltf-binary', 'model/gltf+json', 'application/octet-stream'],
    ALLOWED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    MAX_FILES_PER_REQUEST: 10,
  },

  // Cache
  CACHE: {
    TTL: 60 * 60, // 1 hour
    MAX_ITEMS: 1000,
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100,
  },

  // Validation
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    DESCRIPTION_MAX_LENGTH: 1000,
    TAG_MAX_LENGTH: 30,
    MAX_TAGS: 10,
  },

  // World Settings
  WORLD: {
    MAX_USERS: 50,
    MIN_DIMENSION: 1,
    MAX_DIMENSION: 1000,
  },

  // Error Messages
  ERROR_MESSAGES: {
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden access',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation error',
    INTERNAL_ERROR: 'Internal server error',
  },
} as const; 