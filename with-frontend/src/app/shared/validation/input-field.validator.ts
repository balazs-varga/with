import { AbstractControl } from '@angular/forms';

export function phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneRegex = /^((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})$/;
    if (control.value && !phoneRegex.test(control.value)) {
        return { invalidPhoneFormat: true };
    }
    return null;
}

export function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const passwordRegex = /^(?=.{8,25})(?=[A-ZÍÖÜÓÚŐŰÁÉ]*)(?=.+[a-zíéáűúőóüö])(?=.+[\d])(?=[@#$%^&+=_!?.&#$*:-]*)[A-ZÍÖÜÓÚŐŰÁÉa-zíéáűúőóüö\d@#$%^&+=_!?.&#$*:-]*$/;
    if (control.value && !passwordRegex.test(control.value)) {
        return { invalidPasswordFormat: true };
    }
    return null;
}

export function cityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const cityRegex = /^[A-Za-záéúűőóüöíÍÉÁŰŐÚÓÓÜÖ]+(?:[\s-][A-Za-záéúűőóüöíÍÉÁŰŐÚÓÓÜÖ]+)*$/;
    if (control.value && !cityRegex.test(control.value)) {
        return { invalidCityFormat: true };
    }
    return null;
}

export function addressValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const addressRegex = /\d{1}/;
    if (control.value && !addressRegex.test(control.value)) {
        return { invalidAddressFormat: true };
    }
    return null;
}

export function taxNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const taxNumberRegex = /^(\d{7})(\d)\-([1-5])\-(0[2-9]|[13][0-9]|2[02-9]|4[0-4]|51)$/;
    if (control.value && !taxNumberRegex.test(control.value)) {
        return { invalidTaxNumberFormat: true };
    }
    return null;
}
