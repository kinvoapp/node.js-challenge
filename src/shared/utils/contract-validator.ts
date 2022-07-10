export class ContractValidator {
    constructor(public errors: Array<{ message: string }> = []) { }

    isRequired(value, message: string) {
        if (!value || value.length <= 0) {
            this.errors.push({ message: message });
        }
    }

    isRequiredString(value, message: string) {
        if (!value || typeof (value) != 'string') {
            this.errors.push({ message: message });
        }
    }

    isRequiredNumber(value, message: string) {
        if (value == 0) { }
        else if (!value || value.length <= 0) {
            this.errors.push({ message: message });
        }
    }

    isIntegerArray = (value: number[], message: string) => {
        value.forEach((number) => {
            if (!Number.isInteger(number))
                this.errors.push({ message: message });
        })
    }

    isStringArray = (value: string[], message: string) => {
        value.forEach((string) => {
            if (typeof (value) != 'string')
                this.errors.push({ message: message });
        })
    }

    isRequiredBoolean(value, message: string) {
        if (value !== true && value !== false) {
            this.errors.push({ message: message });
        }
    }

    hasMinLen = (value, min, message: string) => {
        if (!value || value.length < min) {
            this.errors.push({ message: message });
        }
    }

    hasMaxLen = (value, max, message: string) => {
        if (!value || value.length > max) {
            this.errors.push({ message: message });
        }
    }

    isFixedLen = (value, len, message: string) => {
        if (value.length != len) {
            this.errors.push({ message: message });
        }
    }

    isInteger = (value: number, message: string) => {
        if (!Number.isInteger(value))
            this.errors.push({ message: message });
    }

    isUUID = (value, message: string) => {
        let regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        if (!regexExp.test(value))
            this.errors.push({ message: message });
    }

    clear() {
        this.errors = [];
    }

    valid() {
        return this.errors.length === 0;
    }
}