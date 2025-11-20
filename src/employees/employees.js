export const MAX_INTERNS = 10;
export const MAX_AI_SINGULARITIES = 1;

export const intern = {
  type: "intern",
  category: "human",
  salary: 0,
  recruitmentCost: 0,
  productionRate: 0.1,
  tutoringCostMultiplier: 0.95,
  name: "Blue eyed intern",
  image: "👼",
};

export const juniorEmployee = {
  type: "junior",
  category: "human",
  salary: 0.5,
  recruitmentCost: 200,
  productionRate: 1,
  name: "Emile Paloyeux Junior",
  image: "👷",
};

export const seniorEmployee = {
  type: "senior",
  category: "human",
  salary: 1,
  recruitmentCost: 500,
  productionRate: 5,
  name: "Señor Lopez",
  image: "🧑‍💼",
};

export const engineer = {
  type: "engineer",
  category: "human",
  salary: 5,
  recruitmentCost: 2000,
  productionRate: 20,
  name: "Uncle Bob",
  image: "👨‍🔧",
};

export const scientist = {
  type: "scientist",
  category: "human",
  salary: 20,
  recruitmentCost: 100000,
  productionRate: 900,
  name: "Marie Curie",
  image: "👩‍🔬",
};

export const robot = {
  type: "robot",
  category: "machine",
  salary: 200,
  recruitmentCost: 2_000_000,
  productionRate: 2100,
  name: "Bender Bending Rodríguez",
  image: "🤖",
};

export const AISingularity = {
  type: "AI_singularity",
  category: "machine",
  salary: 1_000_000,
  recruitmentCost: 1_000_000_000,
  productionRate: 42_000_000,
  name: "The Singularity",
  image: "✨",
};

export const availableInterns = [
  { ...intern, name: "Leo" },
  { ...intern, name: "Rohan" },
  { ...intern, name: "Yabing" },
  { ...intern, name: "Janne" },
  { ...intern, name: "Frida" },
];
