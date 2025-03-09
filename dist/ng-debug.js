import { debug, debugChannel } from './debug';
import { pipe } from './pipe';
import { fn } from './fn';
import { prop } from './prop';
import { signal } from './signal';
import { event } from './event';
export const ngDebugChannel = debugChannel;
export function createNgDebugger(id) {
    const $debug = (message, data) => debug(id, message, data);
    $debug.pipe = (message) => pipe(id, message);
    $debug.signal = (message) => signal(id, message);
    $debug.fn = (message) => fn(id, message);
    $debug.prop = (message) => prop(id, message);
    $debug.event = (message) => event(id, message);
    return $debug;
}
//# sourceMappingURL=ng-debug.js.map