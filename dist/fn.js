import { Observable, throwError } from 'rxjs';
import { $id } from './utils';
import { debug } from './debug';
import { tap, catchError } from 'rxjs/operators';
const fnMessage = (prefix, message, callId) => {
    return `${prefix} ` + (message ? `[${message}] ` : '') + callId;
};
export const fn = (groupId, message = '') => {
    return (target, propertyName, descriptor) => {
        const originalMethod = descriptor.value;
        let index = 0;
        descriptor.value = function (...args) {
            const callId = `(#${++index})`;
            const id = $id(groupId, `${propertyName}()`);
            const startMessage = fnMessage('Start', message, callId);
            const completeMessage = fnMessage('Complete', message, callId);
            const errorMessage = fnMessage('Error', message, callId);
            const completed = (value) => debug(id, completeMessage, value);
            const error = (error) => debug(id, errorMessage, error);
            let result;
            try {
                args.length ? debug(id, startMessage, Array.from(args)) : debug(id, startMessage);
                result = originalMethod.apply(this, args);
            }
            catch (e) {
                error(e);
                throw e;
            }
            if (result instanceof Observable) {
                return result.pipe(tap(completed), catchError((e) => {
                    error(e);
                    return throwError(() => e);
                }));
            }
            else if (result instanceof Promise) {
                return result.then(completed, error);
            }
            else {
                completed(result); // Log all functions
                return result;
            }
        };
        Reflect.defineProperty(target, propertyName, descriptor);
    };
};
//# sourceMappingURL=fn.js.map