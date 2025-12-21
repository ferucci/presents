import axios from "axios";
import { Product } from "../types";
import { API_URL } from "../utils/vars";


export const getProducts = async () => {

  const response = await axios.get<Product[]>(`${API_URL}/products`);
  const products = response.data;
  return products;


}

export const getProduct = async (productId: number) => {
  const response = await axios.get<Product>(`${API_URL}/products/${productId}`);
  const product = response.data;
  return product;
}