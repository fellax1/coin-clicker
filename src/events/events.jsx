import "./events.css";

export function Events({ events }) {
  return (
    <ul className="events">
      {[...events].reverse().map((event, index) => {
        return (
          <li className="event" key={index}>
            <p>{new Date(event.timestamp).toLocaleTimeString()}</p>
            <h3>
              {event.name}
              {event.secondsPassed && (
                <>
                  <br />
                  <span className="seconds-passed">
                    After {event.secondsPassed} seconds of gameplay
                  </span>
                </>
              )}
            </h3>
            <p>
              {event.description}{" "}
              {event.consequences && getEffectDescription(event.consequences)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function getEffectDescription(consequences) {
  const effects = [];

  if (consequences.reward && consequences.reward !== 0) {
    effects.push(
      `${consequences.reward > 0 ? "+" : ""}${consequences.reward} kr`,
    );
  }

  if (
    consequences.employeeMultiplier &&
    consequences.employeeMultiplier.period > 0
  ) {
    effects.push(
      `Employee production x${consequences.employeeMultiplier.size} for ${consequences.employeeMultiplier.period} seconds`,
    );
  }

  if (
    consequences.playerMultiplier &&
    consequences.playerMultiplier.period > 0
  ) {
    effects.push(
      `Player production x${consequences.playerMultiplier.size} for ${consequences.playerMultiplier.period} seconds`,
    );
  }

  if (!effects.length) {
    return null;
  }

  return "(" + effects.join(", ") + ")";
}
