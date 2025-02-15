import AddressEntity from "@users/entities/address.entity";

export default class AddressDTO {
  id: number;
  addressType: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude: number;
  longitude: number;
  placeId: string;

  constructor(
    id: number,
    addressType: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    latitude: number,
    longitude: number,
    placeId: string,
  ) {
    this.id = id;
    this.addressType = addressType;
    this.street = street;
    this.number = number;
    this.complement = complement;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.placeId = placeId;
  }

  static fromEntity(entity: AddressEntity): AddressDTO {
    return new AddressDTO(
      entity.id,
      entity.addressType,
      entity.street,
      entity.number,
      entity.complement,
      entity.neighborhood,
      entity.city,
      entity.state,
      entity.zipCode,
      entity.country,
      entity.latitude,
      entity.longitude,
      entity.placeId,
    );
  }
}
