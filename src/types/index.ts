export interface DomainCheckResponse {
  taken: boolean;
}

export interface StoreCreateRequest {
  name: string;
  currency: string;
  country: string;
  domain: string;
  category: string;
  email: string;
}

export interface StoreCreateResponse {
  success: boolean;
  message?: string;
  store?: {
    id: string;
    name: string;
    domain: string;
  };
}
