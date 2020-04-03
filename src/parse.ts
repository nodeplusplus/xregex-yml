import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import types from "./yamlTypes";

export function parse<T = any>(ymlPath: string): T | null {
  if (!ymlPath || typeof ymlPath !== "string") return null;
  if (!fs.existsSync(ymlPath as any)) return null;

  const realPath = path.isAbsolute(ymlPath) ? ymlPath : path.resolve(ymlPath);
  const templateRawContent = fs.readFileSync(realPath, "utf8");

  const schema = new yaml.Schema({
    include: [yaml.DEFAULT_FULL_SCHEMA],
    explicit: Object.values(types),
  });

  return yaml.safeLoad(templateRawContent, {
    schema,
    json: true,
  });
}
