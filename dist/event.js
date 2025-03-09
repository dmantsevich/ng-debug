import { $id } from './utils';
import { debug } from './debug';
export const event = (groupId, message = 'Event was emitted') => {
    return (target, propertyName) => {
        Reflect.defineProperty(target, propertyName, {
            set(value) {
                const id = $id(groupId, `${propertyName}`);
                let subscription = value.subscribe((data) => debug(id, message, data));
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
//# sourceMappingURL=event.js.map