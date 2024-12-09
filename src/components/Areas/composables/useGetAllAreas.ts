import { reactive, toRefs } from "vue";
import type { AxiosError } from "axios";
import axiosInstance from "@/services/axiosInstance";
import type { Area } from "@/models/area.model";

interface State {
  data: Area[];
  isLoading: boolean;
  error: null | AxiosError;
}

function useGetAllAreas() {
  const state = reactive<State>({
    data: [],
    isLoading: false,
    error: null,
  });

  const get = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<Area[]>("/areas");
      state.data = response.data;
    } catch (error) {
      state.error = error as AxiosError;
      console.error(error);
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    get,
  };
}

export default useGetAllAreas;
