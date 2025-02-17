"use client";

import FilterQuery from "@/lib/models/FilterQuery";

/**
 * @function creates a query string from query object
 * @description The createQueryString function takes a query object
 *  and returns a query string
 * @param {*} queryObject
 * @returns QueryString
 */
export function createQueryString(queryObject = {}) {
  let queryString = Object.keys(queryObject)
    .filter(
      (key) =>
        queryObject[key].toString() &&
        !(Array.isArray(queryObject[key]) && !queryObject[key].length)
    )
    .map((key) => {
      return Array.isArray(queryObject[key])
        ? queryObject[key]
            .map(
              (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
            )
            .join("&!")
        : `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`;
    })
    .join("&!");
  return queryString ? `?${queryString}` : "";
}

/**
 * @function  turns query string back into an object
 * @description The queryStringToObject function takes a query string and an options object
 *  that tells it the default values (if no values are in the query string) - this is needed
 *  so the function knows the type of value. Which is especially useful when we want to use
 *  arrays or number values.
 * @param {*} queryString
 * @param {*} options
 * @returns queryObject
 */
export function queryStringToObject<T extends Object>(queryString = "", options= {} as T) {
  let queryObject = {} as T;
  let value = options as T
  queryString &&
    decodeURIComponent(queryString.replace("?", ""))
      .split("&!")
      .map((itemString) => {
        let itemArr = itemString.split("=");
        const itemKey = <keyof T>itemArr[0];
        const itemValue = itemArr[1];
        if (options.hasOwnProperty(itemKey) ) {
          if (!queryObject[itemKey] && Array.isArray(options[itemKey])) {
      
             (queryObject[itemKey] as string[])= [];
            
              
          }
          Array.isArray(options[itemKey])
            ? (queryObject[itemKey] as any[]).push(itemValue)
            : ((queryObject[itemKey] as number | string) =
                typeof options[itemKey] === "number"
                  ? parseFloat(itemValue)
                  : itemValue);
        }
      });
  return queryObject;
}

/**
 * @function saveToLocalStorage
 * @description This method turns user object into json string and saves it to local storage
 * @param {*} user
 * @param {string} key
 * @returns null
 */
export const saveToLocalStorage = (user, key) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(user));
  } else if (typeof sessionStorage !== "undefined") {
    // Fallback to sessionStorage if localStorage is not supported
    sessionStorage.setItem(key, JSON.stringify(user));
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log("Web Storage is not supported in this environment.");
  }
};

/**
 * @function getFromLocalStoreage
 * @description This method turns  local storage json string into user object
 * @param {string} key
 * @returns User
 */

export const getFromLocalStorage = (key: any): any => {
  let data;

  if (typeof localStorage !== "undefined") {
    data = localStorage.getItem(key);
  } else if (typeof sessionStorage !== "undefined") {
    // Fallback to sessionStorage if localStorage is not supported
    data = sessionStorage.getItem(key);
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log("Web Storage is not supported in this environment.");
  }

  if (data) {
    return JSON.parse(data);
  }
  return null;
};

/**
 * @function currencyConverter
 * @description This method convert product currency price into app currency price
 * @param {number} price
 * @param
 * @returns price String
 */
export function currencyConverter(price:number, currency) {
  const newPrice = Number(price) * currency.valueToDoller;
  return `${currency.symbol} ${newPrice.toFixed(2)} `;
}

export function checkOlderDate(date, month = 1) {
  const today = new Date();
  var diff = (today.getTime() - date.getTime()) / 1000;
  diff = diff / (60 * 60 * 24 * 10 * 3);
  var diffMonths = Math.abs(Math.round(diff));
  if (diffMonths > month) {
    return false;
  }
  return true;
}
