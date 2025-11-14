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
import { getMilestoneEvent, getRandomEvent } from "./events/events.js";

const WORK_INTERVAL_MS = 200;
const EVENT_INTERVAL_MS = 1000;
const EVENT_INTERVAL_SECONDS = 123;
const START_TIME = Date.now();

const MAX_INTERNS = 10;

let secondsPassed = 0;
let lastEventUpdate = 0;

setInterval(() => {
  secondsPassed += 1;
}, 1000);

function App() {
  const [workCyclesPassed, setWorkCyclesPassed] = useState(0);
  const [eventCyclesPassed, setEventCyclesPassed] = useState(0);

  const [count, setCount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([
    {
      name: "Welcome to Coin Clicker!",
      description:
        "You have just started your coin clicking company. Get to work, and use your earnings to grow your business. Employ workers and take courses to boost your income.",
      timestamp: START_TIME,
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
  const [isSpinning, setIsSpinning] = useState(false);

  const clickSound = new Audio("sounds/click.mp3");
  const withdrawalSound = new Audio("sounds/cash.wav");
  const spinningCoinSound = new Audio("sounds/spinning-coin.mp3");
  const [milestones, setMilestones] = useState({
    oneThousand: null,
    tenThousand: null,
    oneHundredThousand: null,
    oneMillion: null,
    oneBillion: null,
    fiftyEmployees: null,
    oneHundredEmployees: null,
    oneThousandEmployees: null,
  });

  const handleEvent = (newEvent) => {
    const { reward, employeeMultiplier, playerMultiplier } =
        newEvent.consequences;

      setCount((prevCount) => prevCount + reward);

      if (employeeMultiplier?.period !== undefined && employeeMultiplier.period !== 0) {
        setTemporaryEmployeeMultiplier(employeeMultiplier);
      }

      if (playerMultiplier?.period !== undefined && playerMultiplier.period !== 0) {
        setTemporaryPlayerMultiplier(playerMultiplier);
      }

      setEvents((prevEvents) => [...prevEvents, {...newEvent, timestamp: Date.now()}]);
  };

  const updateMilestones = useCallback(() => {
    let balanceEvent, employerEvent;

    if (count > 1000 && !milestones.oneThousand) {
      setMilestones((prev) => ({ ...prev, oneThousand: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneThousand", secondsPassed);
    } else if (count >= 10000 && !milestones.tenThousand) {
      setMilestones((prev) => ({ ...prev, tenThousand: secondsPassed }));
      balanceEvent = getMilestoneEvent("tenThousand", secondsPassed);
    } else if (count >= 100000 && !milestones.oneHundredThousand) {
      setMilestones((prev) => ({ ...prev, oneHundredThousand: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneHundredThousand", secondsPassed);
    } else if (count >= 1000000 && !milestones.oneMillion) {
      setMilestones((prev) => ({ ...prev, oneMillion: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneMillion", secondsPassed);
    } else if (count >= 1000000000 && !milestones.oneBillion) {
      setMilestones((prev) => ({ ...prev, oneBillion: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneBillion", secondsPassed);
    }

    if (employees.length >= 50 && !milestones.fiftyEmployees) {
      setMilestones((prev) => ({ ...prev, fiftyEmployees: secondsPassed }));
      employerEvent = getMilestoneEvent("fiftyEmployees", secondsPassed);
    } else if (employees.length >= 100 && !milestones.oneHundredEmployees) {
      setMilestones((prev) => ({
        ...prev,
        oneHundredEmployees: secondsPassed,
      }));
      employerEvent = getMilestoneEvent("oneHundredEmployees", secondsPassed);
    } else if (employees.length >= 1000 && !milestones.oneThousandEmployees) {
      setMilestones((prev) => ({
        ...prev,
        oneThousandEmployees: secondsPassed,
      }));
      employerEvent = getMilestoneEvent("oneThousandEmployees", secondsPassed);
    }

    if (balanceEvent) {
      handleEvent({...balanceEvent, secondsPassed});
    }

    if (employerEvent) {
      handleEvent({...employerEvent, secondsPassed});
    }
  }, [count, employees, milestones]);

  const nextEvent = useCallback(() => {
    const tier = employees.length < 50 ? "tierOne" : count < 1000000 ? "tierTwo" : "tierThree";
    const newEvent = getRandomEvent(tier);

    if (newEvent) {
      handleEvent(newEvent);
    }
  }, [employees, count]);

  useEffect(() => {
    let totalProduction = employees.reduce(
        (acc, employee) =>
          acc +
          employee.productionRate * (WORK_INTERVAL_MS / 1000) * temporaryEmployeeMultiplier.size -
          employee.salary * (WORK_INTERVAL_MS / 1000),
        0,
      );
       
      setCount((prevCount) => prevCount + totalProduction);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workCyclesPassed, setCount]);

  useEffect(() => {
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
      
      if (secondsPassed != 0 && secondsPassed % EVENT_INTERVAL_SECONDS === 0 && lastEventUpdate !== secondsPassed) {
        nextEvent();
        lastEventUpdate = secondsPassed;
      }

      updateMilestones();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventCyclesPassed, nextEvent, updateMilestones]);

  useEffect(() => {
    // Work timer
    const interval = setInterval(() => {
      setWorkCyclesPassed((prev) => prev + 1);
    }, WORK_INTERVAL_MS);

    // Event timer
    const eventInterval = setInterval(() => {
      setEventCyclesPassed((prev) => prev + 1);
    }, EVENT_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      clearInterval(eventInterval);
    };
  }, [
    setWorkCyclesPassed,
    setEventCyclesPassed,
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
    if (employees.filter((e) => e.type === "intern").length >= MAX_INTERNS) {
      return;
    }
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

const spinCoin = () => {
  setIsSpinning(false);

  setTimeout(() => {
    setIsSpinning(true);

    setTimeout(() => setIsSpinning(false), 2000);
  }, 20);
};

  return (
    <>
      <main>
        <section className="left">
          <h2>Events</h2>
          <Events events={events} />
        </section>
        <section className="middle">
          <h2>Company</h2>
          <p className="count">
            <span>Current balance: </span>
           {count.toFixed(2)} kronor</p>
          <button
            className={`coin-button ${isClicked ? "clicked" : ""}`}
            onClick={() => {
              const clickSound = new Audio("sounds/drop-coin.mp3");
              clickSound.play();

              setCount(
                (count) =>
                  count + 1 * incomeMultiplier * temporaryPlayerMultiplier.size,
              );
              setIsClicked(true);
              setTimeout(() => setIsClicked(false), 70);
            }}
          >
            <div className={`coin3d ${isSpinning ? "spinning" : "coin"}`}>
              <div className={`coin-aura ${temporaryPlayerMultiplier.size === 1 && temporaryEmployeeMultiplier.size === 1 ? "" : temporaryPlayerMultiplier.size < 1 || temporaryEmployeeMultiplier.size < 1 ? "event-negative" : "event-positive" }`}></div>
              <img className="front" src="img/coin-1.png" alt="Krona" />
              <img
                className="back"
                src="img/coin-1-back.png"
                alt="Krona baksida"
              />
            </div>
          </button>

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

             <ul className="stats-list">
            <li>Income per click: <span className="bold">{(1 * incomeMultiplier).toFixed(2)} kr</span></li>
            <li>
              Income per second:{" "}
              <span className="bold">{employees
                .reduce((acc, employee) => acc + employee.productionRate, 0)
                .toFixed(2)}{" "}
              kr</span>
            </li>
            <li>
              Expenses per second:{" "}
              <span className="bold">{employees
                .reduce((acc, employee) => acc + employee.salary, 0)
                .toFixed(2)}{" "}
              kr</span>
            </li>
            <li>
              Net income per second:{" "}
              <span className="bold">{(
                employees.reduce(
                  (acc, employee) => acc + employee.productionRate,
                  0,
                ) -
                employees.reduce((acc, employee) => acc + employee.salary, 0)
              ).toFixed(2)}{" "}
              kr</span>
            </li>
          </ul>
          </div>
        </section>
        <section className="right">
          <h2>Store</h2>
          <p>Workers:</p>
            <button
              onClick={ () =>{
               clickSound.play();
                employIntern();
              }}
              disabled={getEmployeesByType(employees, "intern").length >= MAX_INTERNS}
              title={
                getRecruitmentButtonText(intern) +
                `. Each intern reduces your own productivity by ${100 - intern.tutoringCostMultiplier * 100}%. You can employ up to ${MAX_INTERNS} interns.`
              }
            >
              Employ intern
            </button>
          <button
            disabled={count < juniorEmployee.recruitmentCost}
            onClick={() => {
              withdrawalSound.play();
              employJunior();
            }}
            title={getRecruitmentButtonText(juniorEmployee)}
          >
            Employ junior employee
          </button>
          <button
            disabled={count < seniorEmployee.recruitmentCost}
            onClick={ () => {
              employSenior();
              withdrawalSound.play();
            }}
            title={getRecruitmentButtonText(seniorEmployee)}
          >
            Employ senior employee
          </button>

          <p>Courses:</p>
          {courses.map((course) => {
            const isCompleted = completedCourses.includes(course.id);
            return (
            <div key={course.id}>
              <button
                key={course.id}
                disabled={
                  count < course.cost ||
                  completedCourses.length >= courses.length ||
                  isCompleted
                }
                onClick={() => {
                  spinningCoinSound.play();
                  takeCourse(course);
                  spinCoin();
                }}
                title={`${course.description} (Cost: ${course.cost} kr)`}
              >
                {course.name}
              </button>
              {isCompleted && <span style={{ marginLeft: 16 }}>✅</span>}
            </div>
            );
          })}
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
