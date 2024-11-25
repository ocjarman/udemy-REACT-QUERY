import type { Treatment } from "@shared/types";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback: Treatment[] = []
  // get data from server via useQuery
  const { data = fallback, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  })
  return data;
}
