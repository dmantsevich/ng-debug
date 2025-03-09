import { $id } from './utils';
import { debug } from './debug';
export const prop = (groupId, message = 'Property was changed') => {
    return (target, propertyName) => {
        let value;
        const id = $id(groupId, `${propertyName}`);
        Reflect.defineProperty(target, propertyName, {
            get() {
                return value;
            },
            set(newValue) {
                debug(id, message, newValue);
                value = newValue;
            },
        });
    };
};
//# sourceMappingURL=prop.js.map