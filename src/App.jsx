import { useCallback, useEffect, useState } from "react";
import { courses } from "./courses/courses.js";
import {
  intern,
  juniorEmployee,
  seniorEmployee,
  engineer,
  scientist,
  robot,
  AISingularity,
  MAX_INTERNS,
  MAX_AI_SINGULARITIES,
  getEmployee,
} from "./employees/employees.js";
import "./App.css";
import { Events } from "./events/events.jsx";
import { getMilestoneEvent, getRandomEvent } from "./events/events.js";
import { Buildings, BuildingsStore } from "./buildings/buiidings.jsx";
import { prettyPrintNumber } from "./lib/prettyPrintNumber.js";
import { getTotalBuildingEfficiency } from "./buildings/buildings.js";
import { LuxuryItems, LuxuryItemsStore } from "./luxuryItems/luxuryItems.jsx";

const coinClickSound = new Audio("sounds/drop-coin.mp3");
const employInternSound = new Audio("sounds/click.mp3");
const withdrawalSound = new Audio("sounds/cash.wav");
const spinningCoinSound = new Audio("sounds/spinning-coin.mp3");

const WORK_INTERVAL_MS = 200;
const EVENT_INTERVAL_MS = 1000;
const EVENT_INTERVAL_SECONDS = 123;
const START_TIME = Date.now();

let secondsPassed = 0;
let lastEventUpdate = 0;

setInterval(() => {
  secondsPassed += 1;
}, 1000);

function App() {
  const [workCyclesPassed, setWorkCyclesPassed] = useState(0);
  const [eventCyclesPassed, setEventCyclesPassed] = useState(0);

  const loadedState = loadState();

  const [count, setCount] = useState(loadedState.count);
  const [employees, setEmployees] = useState(loadedState.employees);
  const [events, setEvents] = useState(loadedState.events);
  const [incomeMultiplier, setIncomeMultiplier] = useState(
    loadedState.incomeMultiplier,
  );
  const [temporaryPlayerMultiplier, setTemporaryPlayerMultiplier] = useState(
    loadedState.temporaryPlayerMultiplier,
  );
  const [temporaryEmployeeMultiplier, setTemporaryEmployeeMultiplier] =
    useState(loadedState.temporaryEmployeeMultiplier);
  const [completedCourses, setCompletedCourses] = useState(
    loadedState.completedCourses,
  );
  const [builtBuildings, setBuiltBuildings] = useState(
    loadedState.builtBuildings ?? [],
  );
  const [boughtLuxuryItems, setBoughtLuxuryItems] = useState(
    loadedState.boughtLuxuryItems ?? [],
  );
  const [isClicked, setIsClicked] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const [milestones, setMilestones] = useState(loadedState.milestones);

  const handleNewGame = useCallback(() => {
    const state = getBlankState();

    setCount(state.count);
    setEmployees(state.employees);
    setEvents(state.events);
    setIncomeMultiplier(state.incomeMultiplier);
    setTemporaryPlayerMultiplier(state.temporaryPlayerMultiplier);
    setTemporaryEmployeeMultiplier(state.temporaryEmployeeMultiplier);
    setCompletedCourses(state.completedCourses);
    setBuiltBuildings(state.builtBuildings);
    setBoughtLuxuryItems(state.boughtLuxuryItems ?? []);
    setMilestones(state.milestones);

    localStorage.setItem("coinClickerState", JSON.stringify(state));
  }, []);

  const saveStateInLocalStorage = useCallback(() => {
    const state = {
      count,
      employees,
      events,
      incomeMultiplier,
      temporaryPlayerMultiplier,
      temporaryEmployeeMultiplier,
      completedCourses,
      builtBuildings,
      boughtLuxuryItems,
      milestones,
    };
    localStorage.setItem("coinClickerState", JSON.stringify(state));
  }, [
    count,
    employees,
    events,
    incomeMultiplier,
    temporaryPlayerMultiplier,
    temporaryEmployeeMultiplier,
    completedCourses,
    builtBuildings,
    boughtLuxuryItems,
    milestones,
  ]);

  const handleEvent = (newEvent) => {
    const { reward, employeeMultiplier, playerMultiplier } =
      newEvent.consequences;

    setCount((prevCount) => prevCount + reward);

    if (
      employeeMultiplier?.period !== undefined &&
      employeeMultiplier.period !== 0
    ) {
      setTemporaryEmployeeMultiplier(employeeMultiplier);
    }

    if (
      playerMultiplier?.period !== undefined &&
      playerMultiplier.period !== 0
    ) {
      setTemporaryPlayerMultiplier(playerMultiplier);
    }

    setEvents((prevEvents) => [
      ...prevEvents,
      { ...newEvent, timestamp: Date.now() },
    ]);
  };

  const updateMilestones = useCallback(() => {
    let balanceEvent, employerEvent;

    if (count > 1000 && !milestones.oneThousand) {
      setMilestones((prev) => ({ ...prev, oneThousand: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneThousand", secondsPassed);
    } else if (count >= 10_000 && !milestones.tenThousand) {
      setMilestones((prev) => ({ ...prev, tenThousand: secondsPassed }));
      balanceEvent = getMilestoneEvent("tenThousand", secondsPassed);
    } else if (count >= 100000 && !milestones.oneHundredThousand) {
      setMilestones((prev) => ({ ...prev, oneHundredThousand: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneHundredThousand", secondsPassed);
    } else if (count >= 1_000_000 && !milestones.oneMillion) {
      setMilestones((prev) => ({ ...prev, oneMillion: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneMillion", secondsPassed);
    } else if (count >= 1_000_000_000 && !milestones.oneBillion) {
      setMilestones((prev) => ({ ...prev, oneBillion: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneBillion", secondsPassed);
    } else if (count >= 1_000_000_000_000 && !milestones.oneTrillion) {
      setMilestones((prev) => ({ ...prev, oneTrillion: secondsPassed }));
      balanceEvent = getMilestoneEvent("oneTrillion", secondsPassed);
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
      handleEvent({ ...balanceEvent, secondsPassed });
    }

    if (employerEvent) {
      handleEvent({ ...employerEvent, secondsPassed });
    }
  }, [count, employees, milestones]);

  const nextEvent = useCallback(() => {
    const tier = milestones.oneMillion ? "tierThree" : milestones.oneHundredThousand ? "tierTwo" : "tierOne";

    const newEvent = getRandomEvent(tier);

    if (newEvent) {
      handleEvent(newEvent);
    }
  }, [employees, count]);

  useEffect(() => {
    const buildingEffects = getTotalBuildingEfficiency(builtBuildings);
    let totalProduction = employees.reduce(
      (acc, employee) =>
        acc +
        employee.productionRate *
        buildingEffects[employee.category] *
          (WORK_INTERVAL_MS / 1000) *
          temporaryEmployeeMultiplier.size -
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

    if (
      secondsPassed != 0 &&
      secondsPassed % EVENT_INTERVAL_SECONDS === 0 &&
      lastEventUpdate !== secondsPassed
    ) {
      nextEvent();
      lastEventUpdate = secondsPassed;
    }

    saveStateInLocalStorage();
    updateMilestones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventCyclesPassed]);

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
  }, [setWorkCyclesPassed, setEventCyclesPassed]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "1") {
        setCount((prevCount) => prevCount + 100);
      } else if (event.ctrlKey && event.key === "2") {
        setCount((prevCount) => prevCount + 1000);
      } else if (event.ctrlKey && event.key === "3") {
        setCount((prevCount) => prevCount + 10_000);
      } else if (event.ctrlKey && event.key === "4") {
        setCount((prevCount) => prevCount + 100_000);
      } else if (event.ctrlKey && event.key === "5") {
        setCount((prevCount) => prevCount + 1_000_000);
      } else if (event.ctrlKey && event.key === "6") {
        setCount((prevCount) => prevCount + 10_000_000);
      } else if (event.ctrlKey && event.key === "7") {
        setCount((prevCount) => prevCount + 100_000_000);
      } else if (event.ctrlKey && event.key === "8") {
        setCount((prevCount) => prevCount + 1_000_000_000); 
      } else if (event.ctrlKey && event.key === "9") {
        setCount((prevCount) => prevCount + 10_000_000_000); 
      } else if (event.ctrlKey && event.key === "e") {
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
    const nextIntern = getEmployee("intern");
    setEmployees((prevState) => [...prevState, nextIntern]);
    setIncomeMultiplier(
      (prevCount) => prevCount * nextIntern.tutoringCostMultiplier,
    );
  };

  const employJunior = () => {
    if (count < juniorEmployee.recruitmentCost) {
      return;
    }
    setCount((prevCount) => prevCount - juniorEmployee.recruitmentCost);
    setEmployees((prevState) => [...prevState, getEmployee("junior")]);
  };

  const employSenior = () => {
    if (count < seniorEmployee.recruitmentCost) {
      return;
    }
    setCount((prevCount) => prevCount - seniorEmployee.recruitmentCost);
    setEmployees((prevState) => [...prevState, getEmployee("senior")]);
  };

  const employEngineer = () => {
    if (count < engineer.recruitmentCost) {
      return;
    }
    setCount((prevCount) => prevCount - engineer.recruitmentCost);
    setEmployees((prevState) => [...prevState, getEmployee("engineer")]);
  };

  const employScientist = () => {
    if (count < scientist.recruitmentCost) {
      return;
    }
    setCount((prevCount) => prevCount - scientist.recruitmentCost);
    setEmployees((prevState) => [...prevState, getEmployee("scientist")]);
  };

  const employRobot = () => {
    if (count < robot.recruitmentCost) {
      return;
    }
    setCount((prevCount) => prevCount - robot.recruitmentCost);
    setEmployees((prevState) => [...prevState, getEmployee("robot")]);
  };

  const employAISingularity = () => {
    if (
      count < AISingularity.recruitmentCost ||
      getEmployeesByType(employees, "AI_singularity").length >=
        MAX_AI_SINGULARITIES ||
      getEmployeesByType(employees, "robot").length < 1000
    ) {
      return;
    }
    setCount((prevCount) => prevCount - AISingularity.recruitmentCost);
    setEmployees((prevState) => [...prevState, getEmployee("AI_singularity")]);
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

  const buildingEffects = getTotalBuildingEfficiency(builtBuildings);

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
            {prettyPrintNumber(count.toFixed(2))} kronor
          </p>
          <button
            className={`coin-button ${isClicked ? "clicked" : ""}`}
            onClick={() => {
              coinClickSound.cloneNode().play();

              setCount(
                (count) =>
                  count + 1 * incomeMultiplier * temporaryPlayerMultiplier.size,
              );
              setIsClicked(true);
              setTimeout(() => setIsClicked(false), 70);
            }}
          >
            <div className={`coin3d ${isSpinning ? "spinning" : "coin"}`}>
              <div
                className={`coin-aura ${temporaryPlayerMultiplier.size === 1 ? "" : temporaryPlayerMultiplier.size < 1 ? "event-negative" : "event-positive"}`}
              ></div>
              <img className="front" src="img/coin-1.png" alt="Krona" />
              <img
                className="back"
                src="img/coin-1-back.png"
                alt="Krona baksida"
              />
            </div>
          </button>
          <ul className="stats-list">
            <li>
              Income per click:{" "}
              <span className="bold">
                {prettyPrintNumber(
                  (
                    1 *
                    incomeMultiplier *
                    temporaryPlayerMultiplier.size
                  ).toFixed(2),
                )}{" "}
                kr
              </span>
            </li>
            <li>
              Income per second:{" "}
              <span className="bold">
                {prettyPrintNumber(
                  employees
                    .reduce((acc, employee) => acc + (employee.productionRate * buildingEffects[employee.category]), 0)
                    .toFixed(2),
                )}{" "}
                kr
              </span>
            </li>
            <li>
              Expenses per second:{" "}
              <span className="bold">
                {prettyPrintNumber(
                  employees
                    .reduce((acc, employee) => acc + employee.salary, 0)
                    .toFixed(2),
                )}{" "}
                kr
              </span>
            </li>
            <li>
              Net income per second:{" "}
              <span className="bold">
                {prettyPrintNumber(
                  (
                    employees.reduce(
                      (acc, employee) => acc + (employee.productionRate * buildingEffects[employee.category]),
                      0,
                    ) -
                    employees.reduce(
                      (acc, employee) => acc + employee.salary,
                      0,
                    )
                  ).toFixed(2),
                )}{" "}
                kr
              </span>
            </li>
          </ul>
          <Buildings builtBuildings={builtBuildings} />
          <div
            className={
              "employees " +
              (temporaryEmployeeMultiplier.size < 1
                ? "event-negative"
                : temporaryEmployeeMultiplier.size > 1
                  ? "event-positive"
                  : "")
            }
          >
            {renderEmployeeList(employees, "AI_singularity")}
            {renderEmployeeList(employees, "robot")}
            {renderEmployeeList(employees, "scientist")}
            {renderEmployeeList(employees, "engineer")}
            {renderEmployeeList(employees, "senior")}
            {renderEmployeeList(employees, "junior")}
            {renderEmployeeList(employees, "intern")}
          </div>
        </section>
        <section className="right">
          <h2>Store</h2>
          <h3>Workers</h3>
          <div className="store-buttons">
            <button
              onClick={() => {
                employInternSound.cloneNode().play();
                employIntern();
              }}
              disabled={
                getEmployeesByType(employees, "intern").length >= MAX_INTERNS
              }
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
                withdrawalSound.cloneNode().play();
                employJunior();
              }}
              title={getRecruitmentButtonText(juniorEmployee)}
            >
              Employ junior employee
            </button>
            <button
              disabled={count < seniorEmployee.recruitmentCost}
              onClick={() => {
                withdrawalSound.cloneNode().play();
                employSenior();
              }}
              title={getRecruitmentButtonText(seniorEmployee)}
            >
              Employ senior employee
            </button>
            <button
              disabled={count < engineer.recruitmentCost}
              onClick={() => {
                withdrawalSound.cloneNode().play();
                employEngineer();
              }}
              title={getRecruitmentButtonText(engineer)}
            >
              Employ engineer
            </button>

            <button
              disabled={count < scientist.recruitmentCost}
              onClick={() => {
                withdrawalSound.cloneNode().play();
                employScientist();
              }}
              title={getRecruitmentButtonText(scientist)}
            >
              Employ scientist
            </button>

            <button
              disabled={count < robot.recruitmentCost}
              onClick={() => {
                withdrawalSound.cloneNode().play();
                employRobot();
              }}
              title={getRecruitmentButtonText(robot)}
            >
              Build robot
            </button>

            <button
              disabled={
                count < AISingularity.recruitmentCost ||
                getEmployeesByType(employees, "AI_singularity").length >=
                  MAX_AI_SINGULARITIES
              }
              onClick={() => {
                withdrawalSound.cloneNode().play();
                employAISingularity();
              }}
              title={
                getEmployeesByType(employees, "robot").length === 0
                  ? "?????????"
                  : getRecruitmentButtonText(AISingularity) +
                    ` You need to build 1000 robots before building the singularity. You can only build ${MAX_AI_SINGULARITIES} AI singularity. Obviously.`
              }
            >
              {getEmployeesByType(employees, "robot").length === 0
                ? "???"
                : "Build AI singularity"}
            </button>
          </div>

          <h3>Courses</h3>
          <div className="store-buttons">
            {courses.map((course) => {
              const isCompleted = completedCourses.includes(course.id);
              return (
                <button
                  key={course.id}
                  disabled={
                    count < course.cost ||
                    completedCourses.length >= courses.length ||
                    isCompleted
                  }
                  onClick={() => {
                    spinningCoinSound.cloneNode().play();
                    takeCourse(course);
                    spinCoin();
                  }}
                  title={`${course.description} (Cost: ${prettyPrintNumber(course.cost)} kr)`}
                >
                  {course.name}
                  {isCompleted && <span style={{ marginLeft: 16 }}>✅</span>}
                </button>
              );
            })}
          </div>
          {completedCourses.length === courses.length && (
            <p>All courses completed!</p>
          )}
          <h3>Buildings</h3>
          <BuildingsStore
            builtBuildings={builtBuildings}
            currentBalance={count}
            onClick={(building) => {
              if (count < building.cost) {
                return;
              }

              spinningCoinSound.cloneNode().play();
              spinCoin();
              setCount((prevCount) => prevCount - building.cost);
              setBuiltBuildings((prev) => [...prev, building.id]);

              if (building.employeesEffect) {
                setEmployees((prevEmployees) =>
                  building.employeesEffect(prevEmployees),
                );
              }

              if (building.incomeMultiplierEffect) {
                setIncomeMultiplier((prev) => building.incomeMultiplierEffect(prev));
              }
            }}
          />
            <h3>Luxury Items</h3>
            {!milestones.oneBillion && <button title="?????">???</button>}
          {
            milestones.oneBillion && (
              <>
              <LuxuryItemsStore 
                boughtItems={boughtLuxuryItems}
                currentBalance={count}
                onClick={(item) => {
                  if (count < item.cost) {
                    return;
                  }

                  spinningCoinSound.cloneNode().play();
                  spinCoin();
                  setCount((prevCount) => prevCount - item.cost);
                  setBoughtLuxuryItems((prev) => [...prev, item.id]);
                }}
              />
              </>
            )
          }
        </section>
      </main>
      <footer className="footer">
        <div className="multipliers">
          <span className={getMultiplierClass(temporaryPlayerMultiplier.size)}>
            Temporary player multiplier: x{temporaryPlayerMultiplier.size} (
            {temporaryPlayerMultiplier.period} s left)
          </span>
          <span className="divider">|</span>
          <span
            className={getMultiplierClass(temporaryEmployeeMultiplier.size)}
          >
            Temporary employee multiplier: x{temporaryEmployeeMultiplier.size} (
            {temporaryEmployeeMultiplier.period} s left)
          </span>
        </div>
        <LuxuryItems boughtItems={boughtLuxuryItems} />
        <button onClick={handleNewGame}>New game</button>
      </footer>
    </>
  );
}

function getEmployeesByType(employees, type) {
  return employees.filter((employee) => employee.type === type);
}

function getRecruitmentButtonText(employee) {
  return `Each ${employee.type} costs ${prettyPrintNumber(employee.recruitmentCost)} kr in recruitment fee, has a salary of ${prettyPrintNumber(employee.salary)} kr per second and produces ${prettyPrintNumber(employee.productionRate)} kr every second`;
}

function getMultiplierClass(multiplier) {
  if (multiplier > 1) {
    return "positive";
  } else if (multiplier < 1) {
    return "negative";
  } else {
    return "";
  }
}

function loadState() {
  const savedState = localStorage.getItem("coinClickerState");
  if (savedState) {
    return JSON.parse(savedState);
  } else {
    return getBlankState();
  }
}

function getBlankState() {
  return {
    count: 0,
    employees: [],
    events: [
      {
        name: "Welcome to Coin Clicker!",
        description:
          "You have just started your coin clicking company. Get to work, and use your earnings to grow your business. Employ workers and take courses to boost your income.",
        timestamp: START_TIME,
      },
    ],
    incomeMultiplier: 1,
    temporaryPlayerMultiplier: { size: 1, period: 0 },
    temporaryEmployeeMultiplier: { size: 1, period: 0 },
    completedCourses: [],
    builtBuildings: [],
    boughtLuxuryItems: [],
    milestones: {
      oneThousand: null,
      tenThousand: null,
      oneHundredThousand: null,
      oneMillion: null,
      oneBillion: null,
      oneTrillion: null,
      fiftyEmployees: null,
      oneHundredEmployees: null,
      oneThousandEmployees: null,
    },
  };
}

function renderEmployeeList(employees, type) {
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

export default App;
