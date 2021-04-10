module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['<rootDir>/build'],
	collectCoverage: true,
	testResultsProcessor: 'jest-sonar-reporter',
	coveragePathIgnorePatterns: ['/node_modules/', '/test/', '/db/'],
};
