import API from "./api";

export const getCars = () => {
  return API.get("cars/");
};

export const getCarById = (id) => {
  return API.get(`cars/${id}/`);
};

export const createCar = (data) => {
  return API.post("cars/", data);
};

export const updateCar = (id, data) => {
  return API.put(`cars/${id}/`, data);
};

export const deleteCar = (id) => {
  return API.delete(`cars/${id}/`);
};  

export const uploadCarImages = (carId, formData) => {
  return API.post(`cars/${carId}/images/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCarImage = (imageId) => {
  return API.delete(`cars/images/${imageId}/`);
};