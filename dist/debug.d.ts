import { EventEmitter } from '@angular/core';
import { DebuggerEvent, DebuggerGroupId, DebuggerMessage } from './interfaces';
export declare const debugChannel: EventEmitter<DebuggerEvent>;
export declare function debug(groupId: DebuggerGroupId, message: DebuggerMessage, data?: unknown): void;
//# sourceMappingURL=debug.d.ts.map