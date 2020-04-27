/* eslint-disable no-underscore-dangle, no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching'

if (Object.hasOwnProperty.call(self, '__WB_MANIFEST')) {
  precacheAndRoute(self.__WB_MANIFEST)
}
