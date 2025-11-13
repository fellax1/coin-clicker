export const intern = {
  type: "intern",
  salary: 0,
  recruitmentCost: 0,
  productionRate: 0.1,
  tutoringCostMultiplier: 0.95,
  name: "Intern",
  image: "/intern.png",
};

export const juniorEmployee = {
  type: "junior",
  salary: 0.5,
  recruitmentCost: 200,
  productionRate: 1,
  name: "Noob Junior",
  image: "/junior.png",
};

export const seniorEmployee = {
  type: "senior",
  salary: 1,
  recruitmentCost: 500,
  productionRate: 5,
  name: "Senior Anders",
  image: "/senior1.png",
};

export const availableInterns = [
  { ...intern, name: "Leo", image: "/intern.png" },
  { ...intern, name: "Rohan", image: "/intern.png" },
  { ...intern, name: "Yabing", image: "/intern.png" },
  { ...intern, name: "Janne", image: "/intern.png" },
  { ...intern, name: "Frida", image: "/intern.png" },
];

export const availableJuniors = [
  { ...juniorEmployee, name: "Junior Nicool", image: "/junior.png" },
  { ...juniorEmployee, name: "Junior Felix", image: "/junior2.png" },
  { ...juniorEmployee, name: "Junior Petter", image: "/junior3.png" },
];

export const availableSeniors = [
  { ...seniorEmployee, name: "Senior Anders", image: "/senior1.png" },
  { ...seniorEmployee, name: "Senior Lina", image: "/senior2.png" },
  { ...seniorEmployee, name: "Senior Janne", image: "/senior3.png" },
];
