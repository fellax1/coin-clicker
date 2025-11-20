import { juniorEmployee, seniorEmployee } from "../employees/employees";

export const buildings = [
  {
    id: 1,
    icon: "☕",
    name: "Cafeteria",
    description: "A place for your employees to relax and fill up on caffeine.",
    cost: 50_000,
    humanEmployeeEfficiency: 1.2,
    robotEmployeeEfficiency: 1.0,
  },
  {
    icon: "🏋️‍♂️",
    id: 2,
    name: "Gym",
    description: "Keep your employees fit and healthy to boost productivity.",
    cost: 500_000,
    humanEmployeeEfficiency: 1.3,
    robotEmployeeEfficiency: 1.0,
  },
  {
    id: 3,
    icon: "🏥",
    name: "Physical Therapy Center",
    description:
      "Help your employees recover from injuries and reduce downtime.",
    cost: 2_500_000,
    humanEmployeeEfficiency: 1.4,
    robotEmployeeEfficiency: 1.0,
  },
  {
    id: 4,
    icon: "📚",
    name: "Learning center",
    description:
      "A facility to provide ongoing training and development for your staff. Building this also makes all juniors turn into senior employees, and all interns turn into junior employees.",
    cost: 8_000_000,
    humanEmployeeEfficiency: 1.55,
    robotEmployeeEfficiency: 1.0,
    employeesEffect: (employees) => {
      return employees.map((employee) => {
        if (employee.type === "intern") {
          return {...juniorEmployee, name: employee.name};
        }

        if (employee.type === "junior") {
            return {...seniorEmployee, name: employee.name};
        }

        return employee;
      });
    },
    incomeMultiplierEffect: (incomeMultiplier) => incomeMultiplier < 1 ? 1 : incomeMultiplier,
  },
  {
    id: 5,
    icon: "🛠️",
    name: "Service Station",
    description: "A facility to maintain and repair your robotic employees.",
    cost: 33_500_000,
    humanEmployeeEfficiency: 1.0,
    robotEmployeeEfficiency: 1.2,
  },
  {
    id: 6,
    icon: "🚌",
    name: "Employee Transport Hub",
    description:
      "Efficient transportation for your employees to reduce commute time.",
    cost: 100_000_000,
    humanEmployeeEfficiency: 1.4,
    robotEmployeeEfficiency: 1.3,
  },
  {
    id: 7,
    icon: "💾",
    name: "Advanced Data Center",
    description:
      "A high-tech facility to enhance the performance of your AI-driven employees.",
    cost: 15_000_000_000,
    humanEmployeeEfficiency: 1.0,
    robotEmployeeEfficiency: 1.8,
  },
];

export function getTotalBuildingEfficiency(builtBuildings) {
  return builtBuildings.reduce((acc, buildingId) => {
    const building = buildings.find((b) => b.id === buildingId);

    if (!building) {
      return acc;
    }

    acc.human *= building.humanEmployeeEfficiency;
    acc.machine *= building.robotEmployeeEfficiency;
    
    return acc;
  }, {human: 1, machine: 1});
}