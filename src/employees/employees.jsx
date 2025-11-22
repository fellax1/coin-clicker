import { prettyPrintNumber } from "../lib/prettyPrintNumber";

export function EmployeeList({employees, type, employeeMultiplier = 1, buildingEffects = {}}) {
  const employeesOfType = employees.filter((employee) => employee.type === type);
  const effect = buildingEffects[employeesOfType[0]?.category] || 1;
  const adjustedEmployeeMultiplier = employeeMultiplier * effect;
  const numberOfEmployees = employeesOfType.length;
  const heading = (
    type.charAt(0).toUpperCase() +
    type.slice(1) +
    (numberOfEmployees > 1 ? "s" : "")
  ).replace("_", " ");

  return (
    employeesOfType.length > 0 && (
      <>
        <h3>
          {heading} ({numberOfEmployees})
        </h3>
        <p className={type}>
          {employeesOfType.slice(0, 150).map((employee, i) => (
            <span key={`${type}-${i}`} title={employee.name + "\nProduction Rate: " + prettyPrintNumber((employee.productionRate * adjustedEmployeeMultiplier).toFixed(2))}>
              {employee.image}
            </span>
          ))}
        </p>
      </>
    )
  );
}
