import { endpoint } from "../constants";

/* user Login */
export const __endpoint_doLogin = endpoint + "admin/account/login";
export const __endpoint_getFeature = endpoint + "admin/role/features";
export const __endpoint_getServiceType = endpoint + "admin/services/categories";
export const __endpoint_putServiceType = endpoint + "admin/services/categories";
export const __endpoint_addServiceType = endpoint + "admin/services/categories";
export const __endpoint_deleteServiceType =
  endpoint + "admin/services/categories";
export const __endpoint_getSalon = endpoint + "admin/salons";
export const __endpoint_getUser = endpoint + "admin/users";
export const __endpoint_updateUser = endpoint + "admin/users/consumers";
export const __endpoint_fileUploader = endpoint + "admin/file/presignedUrl";

// export const __endpoint_salonDetails = endpoint + "admin/salons";

export const __endpoint_salonDetails = (id) => {
  return `${endpoint}admin/salons/${id}`;
};

export const __endpoint_salesDetails = (id) => {
  return `${endpoint}admin/sales/${id}/user`;
};

export const __endpoint_updateSalonDetails = (id) => {
  return `${endpoint}admin/salons/${id}`;
};
export const __endpoint_updateSaleDetails = (id) => {
  return `${endpoint}admin/sales/${id}/user`;
};

export const __endpoint_updateSalonOwner = (id) => {
  return `${endpoint}admin/salons/profile/${id}`;
};

export const __endpoint_updateBankDetails = (id) => {
  return `${endpoint}admin/salons/${id}/bank`;
};

export const __endpoint_updateSalonService = (salonid, id) => {
  return `${endpoint}admin/salons/${salonid}/service/${id}`;
};

export const __endpoint_fileUploaders = endpoint + "admin/file/presignedUrl";

export const __endpoint_getSales = endpoint + "admin/sales/user";

export const __endpoint_addSalesDetails = endpoint + "admin/sales/user";

export const __endpoint_updateSalonTime = (id) => {
  return `${endpoint}admin/salons/${id}/businessHours`;
};

export const __endpoint_updateImage = (id) => {
  return `${endpoint}admin/file/${id}`;
};

export const __endpoint_deleteImage = (id) => {
<<<<<<< HEAD
    return `${endpoint}admin/file/salon/${id}`;
  };

export const __endpoint_verifySalon = (id) => {
    return `${endpoint}admin/salons/verified/${id}`;
  };

export const __endpoint_publishSalon = (id) => {
    return `${endpoint}admin/salons/publish/${id}`;
  };

=======
  return `${endpoint}admin/file/salon/${id}`;
};
export const __endpoint_getAdsManagement = endpoint + "admin/services/advertisement";
>>>>>>> 98c6d1d2b4ec21da20ca8d89171c02695f56ef9b
