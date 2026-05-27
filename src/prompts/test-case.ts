import type { TestCase } from "../TestCases.js";

export const TestCasePrompt = (testCase: TestCase) => `
    Execute this test case and provide a report according to the your agent instructions:

    ${JSON.stringify(testCase, null, 2)}
`;