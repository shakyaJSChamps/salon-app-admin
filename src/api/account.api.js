import HTTP from "../service/http";
import { methods } from "../constants";
import {
  __endpoint_doLogin,
  __endpoint_getFeature,
  __endpoint_getServiceType,
  __endpoint_putServiceType,
  __endpoint_getSaloon,
  __endpoint_getUser

} from "../constants/endpoints";

export const doLogin = (payload) =>
  HTTP.Request(methods.POST, __endpoint_doLogin, payload);
export const getCountries = (payload) =>
  HTTP.Request(methods.GET, "https://restcountries.com/v2/all", payload);
export const getUser = (payload) =>
  HTTP.Request(methods.GET,`${__endpoint_getUser}${payload}`);
export const getFeature = () =>
  HTTP.Request(methods.GET, __endpoint_getFeature);
export const getServiceType = () =>
  HTTP.Request(methods.GET, __endpoint_getServiceType);
export const putServiceType = (payload, id) => {
  console.log(" id ::>", id);
  HTTP.Request(methods.PUT, `${__endpoint_putServiceType}/${id}`, payload);
};
export const getSaloon = () =>
  HTTP.Request(methods.GET, __endpoint_getSaloon);

