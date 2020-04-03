import path from "path";
import faker from "faker";

import { parse } from "../../src";

interface ITestData {
  name: string;
  age: number;
  status: string;
  is_customer: boolean;
  is_admin: boolean;
  data: {
    env: string;
  };
  env: string;
  code_dir: string;
  mocks_dir: string;
}

describe("parse", () => {
  const name = faker.name.firstName();
  beforeAll(() => {
    process.env.TEST_NAME = name;
    process.env.TEST_STATUS = "active";
    process.env.TEST_IS_CUSTOMER = "true";
  });

  it("should return null if file path is not truthy string", () => {
    expect(parse(undefined as any)).toBeNull();
    expect(parse(null as any)).toBeNull();
    expect(parse("")).toBeNull();
  });

  it("should return null if file path is not exist", () => {
    expect(
      parse(path.resolve(process.env.PWD as string, "mocks/not-found.yml"))
    ).toBeNull();
  });

  it("should parse yaml successfully", () => {
    const contents = [
      parse("./mocks/template.yml"),
      parse(path.resolve("./mocks/template.yml")),
    ] as ITestData[];

    for (let content of contents) {
      expect(content).toBeTruthy();
      expect(content.name).toBe(name);
      expect(content.age).toBe(20);
      expect(content.status).toBe(0);
      expect(content.is_customer).toBe(true);
      expect(content.is_admin).toBe(false);
      expect(content.data).toEqual({ env: "test" });
      expect(content.env).toBe("test");
      expect(content.code_dir).toBe("/home/test/src");
      expect(path.isAbsolute(content.mocks_dir)).toBeTruthy();
    }
  });
});
