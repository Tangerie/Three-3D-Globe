import habitat from 'preact-habitat';

import Globe from './Globe';

const Widget = () => <Globe/>

const _habitat = habitat(Widget);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});
