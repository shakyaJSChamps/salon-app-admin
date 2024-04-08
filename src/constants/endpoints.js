import { endpoint } from '../constants';

/* user Login */
export const __endpoint_doLogin = endpoint + "admin/account/login";
export const __endpoint_getFeature = endpoint + "admin/role/features";
export const __endpoint_getServiceType = endpoint + "admin/services/categories";
export const __endpoint_putServiceType = endpoint + "admin/services/categories";
export const __endpoint_getSalon = endpoint + "admin/salons";
export const __endpoint_getUser = endpoint + "admin/users";
export const __endpoint_updateUser = (id)=> { 
   return `${endpoint}admin/users/consumers/${id}`;
}

