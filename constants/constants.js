const constants = {
  attempts: 3,
  intervals: [
    30 * 60 * 1000, // thirtyMins
    24 * 60 * 60 * 1000, // oneDay
    3 * 24 * 60 * 60 * 1000, // threeDays
  ],
  abandonedStatus: "abandoned",
  startCount: 0,
};

export default constants;
