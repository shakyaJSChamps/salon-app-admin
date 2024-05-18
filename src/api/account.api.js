import HTTP from "../service/http";
import { methods } from "../constants";
import {
  __endpoint_doLogin,
  __endpoint_getFeature,
  __endpoint_getServiceType,
  __endpoint_putServiceType,
  __endpoint_getSalon,
  __endpoint_getUser,
  __endpoint_updateUser,
  __endpoint_addServiceType,
  __endpoint_deleteServiceType,
  __endpoint_salonDetails,
  __endpoint_updateBankDetails,
  __endpoint_updateSalonService,
  __endpoint_updateSalonDetails,
  __endpoint_fileUploaders,
  __endpoint_updateSalonOwner,
  __endpoint_getSales,
  __endpoint_addSalesDetails,
  __endpoint_salesDetails,
  __endpoint_updateSaleDetails,
  __endpoint_updateSalonTime,
  __endpoint_updateImage,
  __endpoint_deleteImage,
  __endpoint_verifySalon,
  __endpoint_publishSalon,
  __endpoint_getAdsManagement,
  __endpoint_addAdsType,
  __endpoint_putAdsType,
  __endpoint_deleteADSType,
} from "../constants/endpoints";

export const doLogin = (payload) =>
  HTTP.Request(methods.POST, __endpoint_doLogin, payload);
export const getCountries = (payload) =>
  HTTP.Request(methods.GET, "https://restcountries.com/v2/all", payload);
export const getUser = (payload) =>
  HTTP.Request(methods.GET, `${__endpoint_getUser}${payload}`);
export const getFeature = () =>
  HTTP.Request(methods.GET, __endpoint_getFeature);
export const getServiceType = () =>
  HTTP.Request(methods.GET, __endpoint_getServiceType);

export const putServiceType = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_putServiceType}/${id}`, payload);

export const getSalon = (payload) =>
  HTTP.Request(methods.GET, `${__endpoint_getSalon}${payload}`);

export const updateUser = (payload, id) =>
  HTTP.Request(methods.PATCH, `${__endpoint_updateUser}/${id}`, payload);

export const addServiceType = (payload) =>
  HTTP.Request(methods.POST, __endpoint_addServiceType, payload);

export const deleteServiceType = (id) =>
  HTTP.Request(methods.DELETE, `${__endpoint_deleteServiceType}/${id}`);

export const fileUploader = () => {
  return Promise.resolve();
};

export const salonDetails = (payload, id) =>
  HTTP.Request(methods.GET,` ${__endpoint_salonDetails}/${id}`, payload, id);

export const salesDetail = (payload, id) =>
  HTTP.Request(methods.GET, `${__endpoint_salesDetails}/${id}/user`, payload, id);

export const updateBankDetails = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_updateBankDetails}/${id}/bank`, payload);

export const updateSalonService = (payload, salonid, id) =>
  HTTP.Request(methods.PUT,`${__endpoint_updateSalonService}/${salonid}/service/${id}`,payload,salonid,id);

export const updateSalonDetails = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_updateSalonDetails}/${id}`, payload, id);

export const updateSaleDetails = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_updateSaleDetails}/${id}/user`, payload, id);

export const fileUploaders = (payload) =>
  HTTP.Request(methods.GET, __endpoint_fileUploaders, payload);

export const updateSalonOwner = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_updateSalonOwner}/${id}`, payload);

export const getSales = (payload) =>
  HTTP.Request(methods.GET, __endpoint_getSales, payload);

export const addSalesDetails = (payload) =>
  HTTP.Request(methods.POST, __endpoint_addSalesDetails, payload);

export const updateSalonTime = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_updateSalonTime}/${id}/businessHours`, payload, id);

export const updateImage = (payload, id) =>
  HTTP.Request(methods.POST, `${__endpoint_updateImage}/${id}`, payload);

export const deleteImage = (id) =>
  HTTP.Request(methods.DELETE, `${__endpoint_deleteImage}/${id}`);

export const verifySalon = (id) =>
  HTTP.Request(methods.PATCH, `${__endpoint_verifySalon}/${id}`);

export const publishSalon = (id) =>
  HTTP.Request(methods.PATCH, `${__endpoint_publishSalon}/${id}`);

export const getAdsManagement = () =>
  HTTP.Request(methods.GET, __endpoint_getAdsManagement);

export const addAdsType = (payload) => {
  console.log(" Add Advertisement Payload:", payload);
  return HTTP.Request(methods.POST, __endpoint_addAdsType, payload);
};
export const putAdsType = (payload, id) =>
  HTTP.Request(methods.PUT, `${__endpoint_putAdsType}/${id}`, payload);
export const deleteADSType = (id) =>
  HTTP.Request(methods.DELETE, `${__endpoint_deleteADSType}/${id}`);