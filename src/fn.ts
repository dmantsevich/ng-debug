import { Observable, throwError } from 'rxjs';
import { DebuggerGroupId, DebuggerMessage } from './interfaces';
import { $id } from './utils';
import { debug } from './debug';
import { tap, catchError } from 'rxjs/operators';

const fnMessage = (prefix: string, message: DebuggerMessage, callId: string): string => {
  return `${prefix} ` + (message ? `[${message}] ` : '') + callId;
};

export const fn = (groupId: DebuggerGroupId, message: DebuggerMessage = '') => {
  return (target: object, propertyName: string, descriptor: PropertyDescriptor): void => {
    const originalMethod = descriptor.value;
    let index = 0;
    descriptor.value = function (...args: unknown[]): unknown {
      const callId = `(#${++index})`;
      const id = $id(groupId, `${propertyName}()`);
      const startMessage = fnMessage('Start', message, callId);
      const completeMessage = fnMessage('Complete', message, callId);
      const errorMessage = fnMessage('Error', message, callId);
      const completed = (value: unknown): void => debug(id, completeMessage, value);
      const error = (error: unknown): void => debug(id, errorMessage, error);
      let result: unknown;

      try {
        args.length ? debug(id, startMessage, Array.from(args)) : debug(id, startMessage);
        result = originalMethod.apply(this, args);
      } catch (e) {
        error(e);
        throw e;
      }

      if (result instanceof Observable) {
        return result.pipe(
          tap(completed),
          catchError((e: unknown) => {
            error(e);
            return throwError(() => e);
          })
        );
      } else if (result instanceof Promise) {
        return result.then(completed, error);
      } else {
        completed(result); // Log all functions
        return result;
      }
    };
    Reflect.defineProperty(target, propertyName, descriptor);
  };
};
