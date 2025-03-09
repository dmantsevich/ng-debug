import { tap } from 'rxjs/operators';
import { DebuggerGroupId, DebuggerMessage } from './interfaces';
import { debug } from './debug';

export const pipe = <T>(groupId: DebuggerGroupId, message: DebuggerMessage = 'Pipe called') => {
  let times = 0;
  return tap((data: T) => debug(groupId, `${message} (#${++times})`, data));
};
