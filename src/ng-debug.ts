import { Debugger, DebuggerGroupId, DebuggerMessage } from './interfaces';
import { debug, debugChannel } from './debug';
import { pipe } from './pipe';
import { fn } from './fn';
import { prop } from './prop';
import { signal } from './signal';
import { event } from './event';

export const ngDebugChannel = debugChannel;

export function createNgDebugger(id: DebuggerGroupId): Debugger {
  const $debug = (message: DebuggerMessage, data?: unknown) => debug(id, message, data);
  $debug.pipe = <T>(message?: DebuggerMessage) => pipe<T>(id, message);
  $debug.signal = (message?: DebuggerMessage) => signal(id, message);
  $debug.fn = (message?: DebuggerMessage) => fn(id, message);
  $debug.prop = (message?: DebuggerMessage) => prop(id, message);
  $debug.event = (message?: DebuggerMessage) => event(id, message);
  return $debug;
}
