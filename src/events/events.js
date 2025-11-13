let events = {
  tierOne: [
    {
      name: "Minor injury",
      description:
        "You sprained your index fingers while doing sick tricks on your Teck Deck. Productivity is slightly reduced for a short period.",
      consequences: {
        reward: 0,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 0.75, period: 20 },
      },
    },
    {
      name: "News coverage",
      description:
        "The local news did a story on your startup, bringing in a modest boost in revenue.",
      consequences: {
        reward: 100,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 1.1, period: 30 },
      },
    },
    {
      name: "Coffee spill",
      description:
        "You accidentally spilled coffee on your keyboard, causing a brief malfunction of your equipment.",
      consequences: {
        reward: 0,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 0, period: 10 },
      },
    },
    {
      name: "Computer virus",
      description:
        "Did you really think it was a good idea to click the button that said 'Download more RAM'? Your computer got infected with a virus, and you had to pay a tech support fee to get it fixed.",
      consequences: {
        reward: -150,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
    {
      name: "Startup mentality",
      description:
        "Almi finally came throught and gave you a small grant to help with your startup costs. Every little bit helps!",
      consequences: {
        reward: 200,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
    {
      name: "A new friend",
      description:
        "A game developer who is working in the basement across the street heard you hammering away on your keyboard and decided to drop by and say hi. He brought you a red bull and some pizza. You feel energized!",
      consequences: {
        reward: 0,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 2, period: 15 },
      },
    },
  ],
  tierTwo: [
    {
      name: "Tax audit",
      description:
        "You got an unforseen tax audit. Since you didn't keep proper records, you have to pay a hefty fine.",
      consequences: {
        reward: -1000,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
    {
      name: "Enhancing supplements",
      description:
        "You tried some expensive enhancing supplements, boosting your productivity significantly.",
      consequences: {
        reward: -1000,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 10, period: 100 },
      },
    },
    {
      name: "Viral marketing success",
      description:
        "One of your marketing campaigns went viral! You gained a lot of new users and your revenue skyrocketed.",
      consequences: {
        reward: 5000,
        employeeMultiplier: { size: 1.2, period: 60 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
    {
      name: "Workplace accident",
      description:
        "An accident occurred at your workplace, leading to temporary shutdown and low morale among workers.",
      consequences: {
        reward: -3000,
        employeeMultiplier: { size: 1.8, period: 45 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
    {
      name: "Server outage",
      description:
        "Your main server went down for several hours, causing a loss in revenue and user trust.",
      consequences: {
        reward: -2000,
        employeeMultiplier: { size: 1.9, period: 30 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
    {
      name: "Flue season",
      description:
        "A severe flu virus hit your area, leading to many employees calling in sick, and a significant drop in productivity.",
      consequences: {
        reward: 0,
        employeeMultiplier: { size: 0.25, period: 70 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
  ],
};

export function getRandomEvent(tier) {
  const randomIndex = Math.floor(Math.random() * events[tier].length);
  const randomEvent = events[tier][randomIndex];
  events[tier].splice(randomIndex, 1);
  events[tier] = events[tier].filter(Boolean);
  return randomEvent;
}
