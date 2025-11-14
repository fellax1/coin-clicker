export const intern = {
  type: "intern",
  salary: 0,
  recruitmentCost: 0,
  productionRate: 0.1,
  tutoringCostMultiplier: 0.95,
  name: "Blue eyed intern",
  image: "👼",
};

export const juniorEmployee = {
  type: "junior",
  salary: 0.5,
  recruitmentCost: 200,
  productionRate: 1,
  name: "Emile Paloyeux Junior",
  image: "👷",
};

export const seniorEmployee = {
  type: "senior",
  salary: 1,
  recruitmentCost: 500,
  productionRate: 5,
  name: "Señor Lopez",
  image: "🧑‍💼",
};

export const engineer = {
  type: "engineer",
  salary: 5,
  recruitmentCost: 2000,
  productionRate: 20,
  name: "Uncle Bob",
  image: "👨‍🔧",
};

export const scientist = {
  type: "scientist",
  salary: 20,
  recruitmentCost: 100000,
  productionRate: 100,
  name: "Marie Curie",
  image: "👩‍🔬",
};

export const availableInterns = [
  { ...intern, name: "Leo", image: "👼" },
  { ...intern, name: "Rohan", image: "👼" },
  { ...intern, name: "Yabing", image: "👼" },
  { ...intern, name: "Janne", image: "👼" },
  { ...intern, name: "Frida", image: "👼" },
];
