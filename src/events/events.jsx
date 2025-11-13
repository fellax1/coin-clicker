import "./events.css";

export function Events({events}) {
    return (
        <ul className="events">
            {events.map((event, index) => (
                <li className="event" key={index}>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                </li>
            ))}
        </ul>
    );
}
