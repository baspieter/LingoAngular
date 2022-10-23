import { IndividualConfig } from "ngx-toastr";

export interface toastPayload {
  message: string;
  title: string;
  ic: IndividualConfig;
  type: string;
}