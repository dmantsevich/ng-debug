import { tap } from 'rxjs/operators';
import { debug } from './debug';
export const pipe = (groupId, message = 'Pipe called') => {
    let times = 0;
    return tap((data) => debug(groupId, `${message} (#${++times})`, data));
};
//# sourceMappingURL=pipe.js.map