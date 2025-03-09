import { EventEmitter } from '@angular/core';
export const debugChannel = new EventEmitter();
export function debug(groupId, message, data) {
    debugChannel.emit({ groupId, message, data });
}
//# sourceMappingURL=debug.js.map