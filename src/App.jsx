import { useCallback, useEffect, useState } from "react";
import { courses } from "./courses";
import {
  intern,
  juniorEmployee,
  seniorEmployee,
  availableInterns,
} from "./employees";
import "./App.css";
import { Events } from "./events/events.jsx";
import { getRandomEvent } from "./events/events.js";

const EVENT_INTERVAL_SECONDS = 180;

let secondsPassed = 0;

function App() {
  const [count, setCount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([
    {
      name: "Welcome to Coin Clicker!",
      description:
        "You have just started your coin clicking company. Get to work, and use your earnings to grow your business. Employ workers and take courses to boost your income.",
    },
  ]);
  const [incomeMultiplier, setIncomeMultiplier] = useState(1);
  const [temporaryPlayerMultiplier, setTemporaryPlayerMultiplier] = useState({
    size: 1,
    period: 0,
  });
  const [temporaryEmployeeMultiplier, setTemporaryEmployeeMultiplier] =
    useState({ size: 1, period: 0 });
  const [completedCourses, setCompletedCourses] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const nextEvent = useCallback(() => {
    const tier = employees.length < 10 ? "tierOne" : count < 1000000 ? "tierTwo" : "tierThree";
    const newEvent = getRandomEvent(tier);

    if (newEvent) {
      const { reward, employeeMultiplier, playerMultiplier } =
        newEvent.consequences;

      setCount((prevCount) => prevCount + reward);

      if (employeeMultiplier.period !== 0) {
        setTemporaryEmployeeMultiplier(employeeMultiplier);
      }

      if (playerMultiplier.period !== 0) {
        setTemporaryPlayerMultiplier(playerMultiplier);
      }

      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  }, [employees, count]);

  useEffect(() => {
    // Work timer
    const interval = setInterval(() => {
      let totalProduction = employees.reduce(
        (acc, employee) =>
          acc +
          employee.productionRate * 0.1 * temporaryEmployeeMultiplier.size -
          employee.salary * 0.1,
        0,
      );
      setCount((prevCount) => prevCount + totalProduction);
    }, 100);

    // Event timer
    const eventInterval = setInterval(() => {
      secondsPassed += 1;

      if (temporaryEmployeeMultiplier?.period === 0) {
        setTemporaryEmployeeMultiplier(() => ({
          size: 1,
          period: 0,
        }));
      } else if (temporaryEmployeeMultiplier?.period > 0) {
        setTemporaryEmployeeMultiplier((prev) => ({
          size: prev.size,
          period: prev.period - 1,
        }));
      }

      if (temporaryPlayerMultiplier?.period === 0) {
        setTemporaryPlayerMultiplier(() => ({
          size: 1,
          period: 0,
        }));
      } else if (temporaryPlayerMultiplier?.period > 0) {
        setTemporaryPlayerMultiplier((prev) => ({
          size: prev.size,
          period: prev.period - 1,
        }));
      }

      if (secondsPassed % EVENT_INTERVAL_SECONDS === 0) {
        nextEvent();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(eventInterval);
    };
  }, [
    employees,
    temporaryEmployeeMultiplier,
    temporaryPlayerMultiplier,
    nextEvent,
  ]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "1") {
        setCount((prevCount) => prevCount + 100);
      } else if (event.ctrlKey && event.key === "2") {
        setCount((prevCount) => prevCount + 1000);
      } else if (event.ctrlKey && event.key === "3") {
        nextEvent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextEvent]);

  const employIntern = () => {
    const nextIntern = availableInterns.pop() ?? { ...intern };
    setEmployees((prevState) => [...prevState, nextIntern]);
    setIncomeMultiplier((prevCount) => prevCount * nextIntern.tutoringCostMultiplier);
  };

  const employJunior = () => {
    if (count < juniorEmployee.recruitmentCost) {
      return;
    }
    setCount((prevCount) => prevCount - juniorEmployee.recruitmentCost);
    setEmployees((prevState) => [...prevState, { ...juniorEmployee }]);
  };

  const employSenior = () => {
    if (count < seniorEmployee.recruitmentCost) {
      return;
    }
    setCount((prevCount) => prevCount - seniorEmployee.recruitmentCost);
    setEmployees((prevState) => [...prevState, { ...seniorEmployee }]);
  };

  const takeCourse = (course) => {
    setIncomeMultiplier((prevCount) => prevCount * course.multiplierIncrease);
    setCount((prevCount) => prevCount - course.cost);
    setCompletedCourses((prevCompleted) => [...prevCompleted, course.id]);
  };

  return (
    <>
      <h1>COIN CLICKER</h1>
      <main>
        <section className="left">
          <h2>Events</h2>
          <Events events={events} />
        </section>
        <section className="middle">
          <h2>Company</h2>
          <p className="count">Current balance: {count.toFixed(2)} kronor</p>
          <button
            className={`coin-button ${isClicked ? "clicked" : ""}`}
            onClick={() => {
              const clickSound = new Audio("drop-coin.mp3");
              clickSound.play();

              setCount(
                (count) =>
                  count + 1 * incomeMultiplier * temporaryPlayerMultiplier.size,
              );
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
                  0,
                ) -
                employees.reduce((acc, employee) => acc + employee.salary, 0)
              ).toFixed(2)}{" "}
              kr
            </li>
          </ul>

          <div className="employees">
            {getEmployeesByType(employees, "intern").length > 0 && (
              <h3>Interns</h3>
            )}
            <p className="interns">
              {getEmployeesByType(employees, "intern").map((intern, i) => (
                <span key={`intern-${i}`} title={intern.name}>
                  {intern.image}
                </span>
              ))}
            </p>

            {getEmployeesByType(employees, "junior").length > 0 && (
              <h3>Junior Employees</h3>
            )}
            <p className="juniors">
              {getEmployeesByType(employees, "junior").map((employee, i) => (
                <span key={`junior-${i}`} title={employee.name}>
                  {employee.image}
                </span>
              ))}
            </p>

            {getEmployeesByType(employees, "senior").length > 0 && (
              <h3>Senior Employees</h3>
            )}
            <p className="seniors">
              {getEmployeesByType(employees, "senior").map((employee, i) => (
                <span key={`senior-${i}`} title={employee.name}>
                  {employee.image}
                </span>
              ))}
            </p>
            <p>Completed workshops: </p>
            {completedCourses.map((courseId) => (
              <span key={`course-${courseId}`}>
                {courses.find((c) => c.id === courseId)?.name}
              </span>
            ))}
          </div>
        </section>
        <section className="right">
          <h2>Store</h2>
          <p>Workers:</p>
          {
            <button
              onClick={employIntern}
              title={getRecruitmentButtonText(intern) + `. Each intern reduces your own productivity by ${100 - intern.tutoringCostMultiplier * 100}%."`}
            >
              Employ intern
            </button>
          }

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
          {completedCourses.length === courses.length && (
            <p>All courses completed!</p>
          )}
        </section>
      </main>
      <footer>
        Temporary player multiplier: x{temporaryPlayerMultiplier.size} (
        {temporaryPlayerMultiplier.period} s left) | Temporary employee
        multiplier: x{temporaryEmployeeMultiplier.size} (
        {temporaryEmployeeMultiplier.period} s left)
      </footer>
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
