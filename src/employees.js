export const intern = {
  type: "intern",
  salary: 0,
  recruitmentCost: 0,
  productionRate: 0.1,
  tutoringCostMultiplier: 0.95,
  name: "Intern",
  image: "👶",
};

export const juniorEmployee = {
  type: "junior",
  salary: 0.5,
  recruitmentCost: 200,
  productionRate: 1,
  name: "Noob Junior",
  image: "👷",
};

export const seniorEmployee = {
  type: "senior",
  salary: 1,
  recruitmentCost: 500,
  productionRate: 5,
  name: "Senior Lopez",
  image: "🧑‍💼",
};

export const availableInterns = [
  { ...intern, name: "Leo", image: "👶" },
  { ...intern, name: "Rohan", image: "🐤" },
  { ...intern, name: "Yabing", image: "👼" },
  { ...intern, name: "Janne", image: "🥹" },
  { ...intern, name: "Frida", image: "😴" },
];
