import axios from "axios";
import { DOMAIN_CHECK_URL, STORE_CREATE_URL } from "./constants";
import {
  DomainCheckResponse,
  StoreCreateRequest,
  StoreCreateResponse,
} from "@/types";

export const api = {
  checkDomain: async (domain: string): Promise<DomainCheckResponse> => {
    const response = await axios.get(
      `${DOMAIN_CHECK_URL}/${domain}.expressitbd.com`
    );
    return response.data;
  },
  createStore: async (
    data: StoreCreateRequest
  ): Promise<StoreCreateResponse> => {
    const response = await axios.post(STORE_CREATE_URL, data);
    return response.data;
  },
};
