import { QueryClient } from "@tanstack/react-query";

export const queryClinet = new QueryClient({
  defaultOptions: {
    queries:{
      retry: false
    },
    mutations: {
      retry: false
    }
  }
})