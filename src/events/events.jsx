import "./events.css";

export function Events({ events }) {
  return (
    <ul className="events">
      {events.map((event, index) => {
        const reward = event.consequences?.reward ?? 0;
        return (
          <li className="event" key={index}>
            <p>{new Date(event.timestamp).toLocaleTimeString()}</p>
            <h3>
              {event.name}
              {event.secondsPassed &&
                <>
                <br />
                <span className="seconds-passed">
                  After {event.secondsPassed} seconds of gameplay
                </span>
                </>
              }
            </h3>
            <p>
              {event.description}{" "}
              {reward !== 0 && `(${reward > 0 ? "+" : ""}${reward} kr)`}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
