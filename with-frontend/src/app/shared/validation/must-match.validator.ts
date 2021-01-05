import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('c_password').value
        ? null : { mustMatch: true };
}
