import { DebuggerGroupId, DebuggerMessage } from './interfaces';
import { $id } from './utils';
import { debug } from './debug';

export const prop = (groupId: DebuggerGroupId, message: DebuggerMessage = 'Property was changed') => {
  return (target: object, propertyName: string): void => {
    let value: unknown;
    const id = $id(groupId, `${propertyName}`);
    Reflect.defineProperty(target, propertyName, {
      get() {
        return value;
      },
      set(newValue: unknown) {
        debug(id, message, newValue);
        value = newValue;
      },
    });
  };
};
