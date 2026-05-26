import fs from "node:fs";

export type TestCaseStep = {
    id: number,
    type: string,
    action: string,
    expectedResult: string
};

export type TestCase = {
    id: number,
    title: string,
    state: string,
    priority: number,
    area: string,
    tags: string[],
    description: string,
    steps: TestCaseStep[]
};



export const getTestCases = () => {
    const testCases = JSON.parse(fs.readFileSync("example-tests.json", "utf-8")) as TestCase[];
    return testCases;
}