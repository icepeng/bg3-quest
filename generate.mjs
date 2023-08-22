import convert from "xml-js";
import fs from "fs-extra";

const questXml = fs.readFileSync("data/quest_prototypes.lsx", "utf8");
const objectiveXml = fs.readFileSync("data/objective_prototypes.lsx", "utf8");
const questJson = convert.xml2js(questXml, { compact: true });
const objectiveJson = convert.xml2js(objectiveXml, { compact: true });

function ensureArray(x) {
  return Array.isArray(x) ? x : [x];
}

function transformAttribute(attribute) {
  return Object.fromEntries(
    ensureArray(attribute)
      .map((x) => x._attributes)
      .map(({ id, value, handle }) => [id, handle ? handle : value])
  );
}

function transformQuest(data) {
  const QuestSteps = ensureArray(data.children.node)
    .filter((x) => x._attributes.id === "QuestStep")
    .map((x) => x.attribute)
    .map(transformAttribute);

  const SubQuests = ensureArray(data.children.node)
    .filter((x) => x._attributes.id === "SubQuests")
    .map((x) => x.attribute._attributes.value);

  return {
    ...transformAttribute(data.attribute),
    QuestSteps,
    SubQuests,
  };
}

function transformObjective(data) {
  const Markers = data.children
    ? ensureArray(data.children.node)
        .filter((x) => x._attributes.id === "Markers")
        .map((x) => x.attribute)
        .map(transformAttribute)
        .map((x) => x.Markers)
    : [];

  return {
    ...transformAttribute(data.attribute),
    Markers,
  };
}

fs.writeJSONSync(
  "quest.json",
  questJson.save.region.node.children.node.map(transformQuest),
  {
    spaces: 2,
  }
);

fs.writeJSONSync(
  "objective.json",
  objectiveJson.save.region.node.children.node.map(transformObjective),
  {
    spaces: 2,
  }
);
