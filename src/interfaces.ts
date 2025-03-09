import { MonoTypeOperatorFunction } from 'rxjs';
export type DebuggerMessage = string; // Message
export type DebuggerGroupId = string; // Uniq ID for Group. Useful for filtering or grouping logs

export interface Debugger {
  (message: DebuggerMessage, data?: unknown): void;
  pipe<T>(message?: DebuggerMessage): MonoTypeOperatorFunction<T>;
  signal(message?: DebuggerMessage): (target: object, propertyName: string) => void;
  fn(message?: DebuggerMessage): (target: object, propertyName: string, descriptor: PropertyDescriptor) => void;
  prop(message?: DebuggerMessage): (target: object, propertyName: string) => void;
  event(message?: DebuggerMessage): (target: object, propertyName: string) => void;
}

export interface DebuggerEvent {
  groupId: DebuggerGroupId;
  message: DebuggerMessage;
  data?: unknown;
}
