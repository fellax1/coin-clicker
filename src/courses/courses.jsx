import { prettyPrintNumber } from "../lib/prettyPrintNumber";

export function Courses({ courses, completedCourses, count, onClick, hidden }) {
    return (
        <div className="store-buttons">
            { !hidden && courses.map((course) => {
                const isCompleted = completedCourses.includes(course.id);
                return (
                    <button
                        key={course.id}
                        disabled={
                            count < course.cost ||
                            isCompleted
                        }
                        onClick={() => onClick(course)}
                        title={`${course.description} (Cost: ${prettyPrintNumber(course.cost)} kr)`}
                    >
                        {course.name}
                        {isCompleted && <span style={{ marginLeft: 16 }}>✅</span>}
                    </button>
                );
            })}
            { hidden &&
                <button title="?????">???</button>
            }
        </div>
    )
}