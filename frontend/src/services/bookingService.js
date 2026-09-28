import API from "./api";

export const createBooking = (data) => {
  return API.post("bookings/", data);
};

export const getMyBookings = () => {
  return API.get("bookings/");
};