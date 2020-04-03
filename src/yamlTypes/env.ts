import yaml from "js-yaml";

export default new yaml.Type("!ENV", {
  kind: "sequence",
  construct: ([envName, defaultValue]: [string, any?]) => {
    const value = process.env[envName] || defaultValue;
    if (typeof defaultValue === "number") return Number(value) || 0;
    if (typeof defaultValue === "boolean") return value === "true" || false;
    return value;
  },
});
