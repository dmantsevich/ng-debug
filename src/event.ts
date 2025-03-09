import { DebuggerGroupId, DebuggerMessage } from './interfaces';
import { OutputEmitterRef, OutputRefSubscription } from '@angular/core';
import { $id } from './utils';
import { debug } from './debug';

export const event = (groupId: DebuggerGroupId, message: DebuggerMessage = 'Event was emitted') => {
  return (target: object, propertyName: string): void => {
    Reflect.defineProperty(target, propertyName, {
      set(value: OutputEmitterRef<unknown>) {
        const id = $id(groupId, `${propertyName}`);
        let subscription: OutputRefSubscription | null = value.subscribe((data) => debug(id, message, data));
        // @ts-ignore
        value.destroyRef.onDestroy(() => {
          subscription?.unsubscribe();
          subscription = null;
        });

        // Delegate to original implementation
        Reflect.defineProperty(this, propertyName, { value });
      },
    });
  };
};
