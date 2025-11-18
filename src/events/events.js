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
        playerMultiplier: { size: 0, period: 15 },
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
    {
      name: "Strike action",
      description:
        "Your employees have gone on strike demanding better working conditions. Productivity is at a standstill until the issue is resolved.",
      consequences: {
        reward: 0,
        employeeMultiplier: { size: 0, period: 30 },
        playerMultiplier: { size: 1, period: 0 },
      },
    },
    {
      name: "The Swedish Tax Agency is coming",
      description:
        "The Swedish Tax Agency (Skatteverket) has been looking into your company's finances and found some discrepancies. They will fine you for every krona you make during their investigation period.",
      consequences: {
        reward: 0,
        employeeMultiplier: { size: 0, period: 0 },
        playerMultiplier: { size: -1, period: 60 },
      },
    },
  ],
  tierThree: [
    {
      name: "Economic recession",
      description:
        "A global economic recession has hit, leading to a significant drop in consumer spending and business investment. Your company's revenue takes a major hit.",
      consequences: {
        reward: -100_000,
        employeeMultiplier: { size: 0.5, period: 150 },
        playerMultiplier: { size: 0.5, period: 30 },
      },
    },
    {
      name: "Cyborg enhancement",
      description:
        "You have been selected for a cutting-edge cyborg enhancement program. The procedure is expensive, but it significantly boosts your productivity beyond human limits.",
      consequences: {
        reward: -300_000,
        employeeMultiplier: { size: 1, period: 0 },
        playerMultiplier: { size: 100, period: 20 },
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

export function getMilestoneEvent(milestone) {
  const baseEvent = {
    name: "Milestone reached 🏆",
    description: `Congratulations! You have reached the milestone of ${milestone.name}. Enjoy this productivity boost as a reward!`,
    consequences: {
      reward: 0,
      employeeMultiplier: { size: 1, period: 0 },
      playerMultiplier: {
        size: milestone.multiplier,
        period: milestone.period,
      },
    },
  };

  switch (milestone) {
    case "oneThousand":
      return {
        ...baseEvent,
        name: "Milestone reached: 1,000 kronor 🏆",
        description: `Congratulations! You have reached the milestone of 1,000 coins. Enjoy a 2x productivity boost for 3 seconds as a reward!`,
        consequences: {
          ...baseEvent.consequences,
          playerMultiplier: { size: 2, period: 3 },
        },
      };

    case "tenThousand":
      return {
        ...baseEvent,
        name: "Milestone reached: 10,000 kronor 🏆",
        description: `Congratulations! You have reached the milestone of 10,000 coins. Enjoy a 3x productivity boost for 4 seconds as a reward!`,
        consequences: {
          ...baseEvent.consequences,
          playerMultiplier: { size: 3, period: 4 },
        },
      };

    case "oneHundredThousand":
      return {
        ...baseEvent,
        name: "Milestone reached: 100,000 kronor 🏆",
        description: `Congratulations! You have reached the milestone of 100,000 coins. Enjoy a 4x productivity boost for 5 seconds as a reward!`,
        consequences: {
          ...baseEvent.consequences,
          playerMultiplier: { size: 4, period: 5 },
        },
      };

    case "oneMillion":
      return {
        ...baseEvent,
        name: "Milestone reached: 1,000,000 kronor 🏆",
        description: `Congratulations! You have reached the milestone of 1,000,000 coins. Enjoy a 5x productivity boost for 6 seconds as a reward! And make sure to pick out a nice top hat for yourself.`,
        consequences: {
          ...baseEvent.consequences,
          playerMultiplier: { size: 5, period: 6 },
        },
      };

    case "oneBillion":
      return {
        ...baseEvent,
        name: "Milestone reached: 1,000,000,000 kronor 🏆",
        description: `Congratulations! You have reached the milestone of 1,000,000,000 coins. Enjoy a 10x productivity boost for 10 seconds as a reward!`,
        consequences: {
          ...baseEvent.consequences,
          playerMultiplier: { size: 10, period: 10 },
        },
      };

    case "fiftyEmployees":
      return {
        ...baseEvent,
        name: "Milestone reached: 50 employees 🏆",
        description: `Congratulations! You have hired 50 employees. Enjoy a 1.5x productivity boost for 30 seconds as a reward! Stay productive!`,
        consequences: {
          ...baseEvent.consequences,
          employeeMultiplier: { size: 1.5, period: 30 },
        },
      };

    case "oneHundredEmployees":
      return {
        ...baseEvent,
        name: "Milestone reached: 100 employees 🏆",
        description: `Congratulations! You have hired 100 employees. Enjoy a 2x productivity boost for 60 seconds as a reward! Hope you have enough chairs!`,
        consequences: {
          ...baseEvent.consequences,
          employeeMultiplier: { size: 2, period: 60 },
        },
      };

    case "oneThousandEmployees":
      return {
        ...baseEvent,
        name: "Milestone reached: 1,000 employees 🏆",
        description: `Congratulations! You have hired 1,000 employees. Enjoy a 3x productivity boost for 120 seconds as a reward! Maybe it's time to consider giving everyone a raise?`,
        consequences: {
          ...baseEvent.consequences,
          employeeMultiplier: { size: 3, period: 120 },
        },
      };

    default:
      return baseEvent;
  }
}
