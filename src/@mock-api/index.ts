// eslint-disable-next-line import/extensions
import api from './api.ts';
import './data/apps.chat.ts';
import './data/apps.contacts.ts';
import './data/apps.events.ts';
import './data/apps.mailbox.ts';
import './data/apps.tasks.ts';
// eslint-disable-next-line import/extensions
import './data/datatable.ts';
// eslint-disable-next-line import/extensions
import './data/notifications.ts';
// eslint-disable-next-line import/extensions
import './data/products.ts';
// eslint-disable-next-line import/extensions
import './data/users.ts';

api.onAny().passThrough();
