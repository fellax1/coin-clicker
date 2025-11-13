let events = [
    { 
        name: "Tax audit", 
        description: "You got an unforseen tax audit. Since you didn't keep proper records, you have to pay a hefty fine.", 
        consequences: { reward: -1000, employeeMultiplier: { size: 0, period: 0 }, playerMultiplier: { size: 0, period: 0 } } 
    },
    {
        name: "Viral marketing success",
        description: "One of your marketing campaigns went viral! You gained a lot of new users and your revenue skyrocketed.",
        consequences: { reward: 5000, employeeMultiplier: { size: 1.2, period: 60 }, playerMultiplier: { size: 0, period: 0 } }
    },
    {
        name: "Server outage",
        description: "Your main server went down for several hours, causing a loss in revenue and user trust.",
        consequences: { reward: -2000, employeeMultiplier: { size: 0.9, period: 30 }, playerMultiplier: { size: 0, period: 0 } }
    },
    {
        name: "Workplace accident",
        description: "An accident occurred at your workplace, leading to temporary shutdown and low morale among workers.",
        consequences: { reward: -3000, employeeMultiplier: { size: 0.8, period: 45 }, playerMultiplier: { size: 0, period: 0 } }
    },
    {
        name: "Enhancing supplements",
        description: "You tried some expensive enhancing supplements, boosting your productivity significantly.",
        consequences: { reward: -1000, employeeMultiplier: { size: 0, period: 0 }, playerMultiplier: { size: 10, period: 100 } }
    }
]

export function getRandomEvent() {
    const randomIndex = Math.floor(Math.random() * (events.length));
    const randomEvent = events[randomIndex];
    events.splice(randomIndex, 1);
    events = events.filter(Boolean)
    return randomEvent;
}