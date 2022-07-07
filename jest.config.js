module.exports = {
  coverageProvider: 'babel',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/infra/postgres/helpers/config.ts'
  ],
  moduleNameMapper: {
    '@/__tests__/(.+)': '<rootDir>/__tests__/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src/',
    '<rootDir>/__tests__/'
  ],
  transform: {
    '.\\.ts$': 'ts-jest'
  },
  clearMocks: true
}
