import { effect } from '@angular/core';
import { $id } from './utils';
import { debug } from './debug';
export const signal = (groupId, message = 'Signal was changed') => {
    return (target, propertyName) => {
        let isInitialCall = true; // Skip initial changes
        Reflect.defineProperty(target, propertyName, {
            set(value) {
                const id = $id(groupId, `$${propertyName}`);
                effect(() => {
                    const result = value(); // Bind effect and signal
                    !isInitialCall && debug(id, message, result); // Skip first call
                    isInitialCall = false;
                });
                // Delegate to original implementation
                Reflect.defineProperty(this, propertyName, { value });
            },
        });
    };
};
//# sourceMappingURL=signal.js.map