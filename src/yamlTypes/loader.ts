import path from "path";
import _ from "lodash";
import yaml from "js-yaml";

export default new yaml.Type("!LOADER", {
  kind: "sequence",
  construct: ([filePath, property]: [string, string?]) => {
    const data = require(path.resolve(filePath));
    return property ? _.get(data, property) : data;
  },
});
