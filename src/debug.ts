import { EventEmitter } from '@angular/core';
import { DebuggerEvent, DebuggerGroupId, DebuggerMessage } from './interfaces';

export const debugChannel = new EventEmitter<DebuggerEvent>();

export function debug(groupId: DebuggerGroupId, message: DebuggerMessage, data?: unknown): void {
  debugChannel.emit({ groupId, message, data });
}
