import { DebuggerGroupId, DebuggerMessage } from './interfaces';
import { effect, Signal } from '@angular/core';
import { $id } from './utils';
import { debug } from './debug';

export const signal = (groupId: DebuggerGroupId, message: DebuggerMessage = 'Signal was changed') => {
  return (target: object, propertyName: string): void => {
    let isInitialCall = true; // Skip initial changes
    Reflect.defineProperty(target, propertyName, {
      set(value: Signal<unknown>) {
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
