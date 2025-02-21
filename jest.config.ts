import { pathsToModuleNameMapper } from 'ts-jest';

export default {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "@architecture/*": ["architecture/*"],
      "@infra/*": ["infra/*"],
      "@app/*": ["*"],
      "@users/*": ["domains/users/*"],
      "@services/*": ["domains/services/*"],
      "@pets/*": ["domains/pets/*"],
    },
    { prefix: '<rootDir>' },
  ),
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
};