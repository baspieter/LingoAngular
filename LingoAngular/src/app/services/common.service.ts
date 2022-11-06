import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { toastPayload } from '../ToastPayload';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private toastr: ToastrService) {}

  showToast(toast: toastPayload) {
    this.toastr.show(
      toast.message,
      toast.title,
      toast.ic,
      'toast-' + toast.type
    );
  }

  clearToast() {
    this.toastr.clear();
  }
}