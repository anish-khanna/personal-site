/**
 *
 * Asynchronously loads the component for StocksGraph
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
