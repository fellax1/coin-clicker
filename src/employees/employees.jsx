
export function EmployeeList({employees, type}) {
  const numberOfEmployees = getEmployeesByType(employees, type).length;
  const heading = (
    type.charAt(0).toUpperCase() +
    type.slice(1) +
    (numberOfEmployees > 1 ? "s" : "")
  ).replace("_", " ");

  return (
    getEmployeesByType(employees, type).length > 0 && (
      <>
        <h3>
          {heading} ({numberOfEmployees})
        </h3>
        <p className={type}>
          {getEmployeesByType(employees, type).map((employee, i) => (
            <span key={`${type}-${i}`} title={employee.name}>
              {employee.image}
            </span>
          ))}
        </p>
      </>
    )
  );
}

function getEmployeesByType(employees, type) {
  return employees.filter((employee) => employee.type === type);
}