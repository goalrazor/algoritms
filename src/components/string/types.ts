import {ElementStates} from "../../types/element-states";

export type TValueObject = {
        [x: string]: {
                state: ElementStates,
                self: string,
        },
}

