import { endpoint } from '../constants';

/* user Login */
export const __endpoint_doLogin = endpoint + "admin/account/login";
export const __endpoint_getFeature = endpoint + "admin/role/features";
export const __endpoint_getServiceType = endpoint + "admin/services/categories";
export const __endpoint_putServiceType = endpoint + "admin/services/categories";
export const __endpoint_addServiceType = endpoint + "admin/services/categories";
export const __endpoint_deleteServiceType = endpoint + "admin/services/categories";
export const __endpoint_getSalon = endpoint + "admin/salons";
export const __endpoint_getUser = endpoint + "admin/users";
export const __endpoint_updateUser =  endpoint + "admin/users/consumers";
export const __endpoint_fileUploader = endpoint + "b2b/file/presignedUrl";
// export const __endpoint_salonDetails = endpoint + "admin/salons";

export const __endpoint_salonDetails = (id) => {
    return `${endpoint}admin/salons/${id}`;
  };

export const __endpoint_updateSalonDetails = (id) => {
    return `${endpoint}admin/salons/${id}`;
  };

export const __endpoint_updateBankDetails = (id) => {
    return `${endpoint}admin/salons/${id}/bank`;
  };

export const __endpoint_updateSalonService = (salonid, id) => {
    return `${endpoint}admin/salons/${salonid}/service/${id}`;
  };


