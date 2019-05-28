window._ = require('lodash');
window.moment = require('moment');
window.axios = require('axios');
import * as log from 'loglevel';
if(process.env.NODE_ENV === 'production') {
    log.setLevel(log.levels.ERROR);
} else {
    log.setLevel(log.levels.DEBUG);
}
window.log = log;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import fontawesome from '@fortawesome/fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import faRegular from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(faSolid);
fontawesome.library.add(faRegular);
