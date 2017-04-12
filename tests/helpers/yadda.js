import yadda from 'npm:yadda';

const EventBus = yadda.EventBus;
EventBus.instance().on(EventBus.ON_SCENARIO, () => {
  server.db.emptyData();
  server.loadFixtures();
});

export default yadda;
