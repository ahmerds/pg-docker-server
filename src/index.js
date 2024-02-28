const cron = require('node-cron');
const { doBackup } = require('./backup');

(() => {
  const SCHEDULE = process.env.CRON_SCHEDULE;
  const isValid = cron.validate(SCHEDULE);
  if (!isValid) {
    throw new Error('Please enter a valid cron syntax');
  }

  cron.schedule(SCHEDULE, async () => {
    await doBackup();
  });
})()
