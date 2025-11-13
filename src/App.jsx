import { useEffect, useState } from "react";
import { courses } from "./courses";
import {
  intern,
  juniorEmployee,
  seniorEmployee,
  availableInterns,
} from "./employees";
import "./App.css";

const MAX_INTERNS = 5;

function App() {
  const [count, setCount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [incomeMultiplier, setIncomeMultiplier] = useState(1);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [background, setBackground] = useState("office-0"); // initial bakgrund

  useEffect(() => {
    const interval = setInterval(() => {
      let totalProduction = employees.reduce(
        (acc, employee) =>
          acc + employee.productionRate * 0.1 - employee.salary * 0.1,
        0
      );
      setCount((prevCount) => prevCount + totalProduction);
    }, 100);

    return () => clearInterval(interval);
  }, [employees]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "1") {
        setCount((prevCount) => prevCount + 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const employIntern = () => {
    if (employees.filter((e) => e.type === "intern").length >= MAX_INTERNS)
      return;

    const nextIntern = availableInterns.pop();
    setEmployees((prev) => [...prev, nextIntern]);

    if (!employees.some((e) => e.type === "intern")) {
      setBackground("office-1");
    }
  };

  const employJunior = () => {
    if (count < juniorEmployee.recruitmentCost) return;
    setCount((prev) => prev - juniorEmployee.recruitmentCost);
    setEmployees((prev) => [...prev, { ...juniorEmployee }]);

    if (!employees.some((e) => e.type === "junior")) {
      setBackground("office-2");
    }
  };

  const employSenior = () => {
    if (count < seniorEmployee.recruitmentCost) return;
    setCount((prev) => prev - seniorEmployee.recruitmentCost);
    setEmployees((prev) => [...prev, { ...seniorEmployee }]);

    if (!employees.some((e) => e.type === "senior")) {
      setBackground("office-3");
    }
  };

  const takeCourse = (course) => {
    setIncomeMultiplier((prev) => prev * course.multiplierIncrease);
    setCount((prev) => prev - course.cost);
    setCompletedCourses((prev) => [...prev, course.id]);
  };

  return (
    <>
        <video
      autoPlay
      muted
      loop
      playsInline
      className="background-video"
    >
      <source src="/video1.mp4" type="video/mp4" />
    </video>
    
      <img src="coin-clicker-logo.png" alt="Coin Clicker Logo" className="logo" />
      <main>
        <section
          className="left"
          style={{ backgroundImage: `url(${background}.png)` }}
        >
          <h2>Company</h2>
          <p className="count">Current balance: {count.toFixed(2)} kronor</p>
          <button
            className={`coin-button ${isClicked ? "clicked" : ""}`}
            onClick={() => {
              setCount(count + 1);
              setIsClicked(true);
              setTimeout(() => setIsClicked(false), 70);
            }}
          >
            <img className="coin" src="coin-1.png" alt="Krona" />
          </button>
          <ul>
            <li>Income per click: {(1 * incomeMultiplier).toFixed(2)} kr</li>
            <li>
              Income per second:{" "}
              {employees
                .reduce((acc, employee) => acc + employee.productionRate, 0)
                .toFixed(2)}{" "}
              kr
            </li>
            <li>
              Expenses per second:{" "}
              {employees
                .reduce((acc, employee) => acc + employee.salary, 0)
                .toFixed(2)}{" "}
              kr
            </li>
            <li>
              Net income per second:{" "}
              {(
                employees.reduce(
                  (acc, employee) => acc + employee.productionRate,
                  0
                ) -
                employees.reduce((acc, employee) => acc + employee.salary, 0)
              ).toFixed(2)}{" "}
              kr
            </li>
          </ul>

          <div className="employees">
            {getEmployeesByType(employees, "intern").length > 0 && <h3>Interns</h3>}
            <p className="interns">
              {getEmployeesByType(employees, "intern").map((intern) => (
                <span key={intern.name} title={intern.name}>
                  {intern.image}
                </span>
              ))}
            </p>

            {getEmployeesByType(employees, "junior").length > 0 && <h3>Junior Employees</h3>}
            <p className="juniors">
              {getEmployeesByType(employees, "junior").map((employee) => (
                <span key={employee.name} title={employee.name}>
                  {employee.image}
                </span>
              ))}
            </p>

            {getEmployeesByType(employees, "senior").length > 0 && <h3>Senior Employees</h3>}
            <p className="seniors">
              {getEmployeesByType(employees, "senior").map((employee) => (
                <span key={employee.name} title={employee.name}>
                  {employee.image}
                </span>
              ))}
            </p>

            <p>Completed workshops: </p>
            {completedCourses.map((courseId) => (
              <span key={courseId}>
                {courses.find((c) => c.id === courseId)?.name}
              </span>
            ))}
          </div>
        </section>

        <section className="right">
          <h2>Store</h2>
          <p>Workers:</p>

          <button
            disabled={employees.filter((e) => e.type === "intern").length >= MAX_INTERNS}
            onClick={employIntern}
            title={getRecruitmentButtonText(intern)}
          >
            Employ intern
          </button>
          {employees.filter((e) => e.type === "intern").length >= MAX_INTERNS && (
            <p>You have reached the maximum number of interns ({MAX_INTERNS})</p>
          )}

          <button
            disabled={count < juniorEmployee.recruitmentCost}
            onClick={employJunior}
            title={getRecruitmentButtonText(juniorEmployee)}
          >
            Employ junior employee
          </button>

          <button
            disabled={count < seniorEmployee.recruitmentCost}
            onClick={employSenior}
            title={getRecruitmentButtonText(seniorEmployee)}
          >
            Employ senior employee
          </button>

          <p>Courses:</p>
          {courses.map((course) => (
            <button
              key={course.id}
              disabled={
                count < course.cost ||
                completedCourses.length >= courses.length ||
                completedCourses.includes(course.id)
              }
              onClick={() => takeCourse(course)}
              title={`${course.description} (Cost: ${course.cost} kr)`}
            >
              {course.name}
            </button>
          ))}
          {completedCourses.length === courses.length && <p>All courses completed!</p>}
        </section>
      </main>
    </>
  );
}

function getEmployeesByType(employees, type) {
  return employees.filter((employee) => employee.type === type);
}

function getRecruitmentButtonText(employee) {
  return `Each ${employee.type} costs ${employee.recruitmentCost} kr in recruitment fee, has a salary of ${employee.salary} kr per second and produces ${employee.productionRate} kr every second`;
}

export default App;
