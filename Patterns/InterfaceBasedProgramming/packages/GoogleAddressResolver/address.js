/* eslint-disable camelcase */

/**
see: https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingResults
*/
/** @typedef {{
   short_name: string,
   long_name: string,
   postcode_localities: string[],
   types: string[]
}} GoogleAddressComponent */

/** @typedef {{
 types: string[],
 formatted_address: string,
 address_components: Array<GoogleAddressComponent>
}} GeocodingResult */

/** @typedef {import('../domain').Address} Address */

/** @type {(result: GeocodingResult) => Address} */
export const addressFromGeocodingResult = ({ address_components }) =>
  address_components.reduce( // eslint-disable-line camelcase
    (address, addressComponent) => {
      if (addressComponent.types.includes('postal_code')) {
        address.postalCode = addressComponent.short_name;
      } else if (addressComponent.types.includes('country')) {
        address.country = addressComponent.short_name;
      } else if (addressComponent.types.includes('locality')) {
        address.city = addressComponent.short_name;
      } else if (addressComponent.types.includes('route')) {
        address.streetName = addressComponent.short_name;
      } else if (addressComponent.types.includes('street_number')) {
        address.houseNumber = addressComponent.short_name;
      }

      return address;
    },
    /** @type {Address} */ ({}),
  );
