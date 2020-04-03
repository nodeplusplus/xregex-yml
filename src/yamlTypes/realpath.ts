import path from "path";
import yaml from "js-yaml";

export default new yaml.Type("!REALPATH", {
  kind: "scalar",
  construct: (filePath: string) =>
    path.isAbsolute(filePath) ? filePath : path.resolve(filePath),
});
