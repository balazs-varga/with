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
