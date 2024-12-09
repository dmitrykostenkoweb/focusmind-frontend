import { reactive, toRefs } from "vue";
import type { AxiosError } from "axios";
import axiosInstance from "@/services/axiosInstance";
import type { Area } from "@/models/area.model";

interface State {
  data: Area | null;
  isLoading: boolean;
  error: null | AxiosError;
}

function useGetAreaById() {
  const state = reactive<State>({
    data: null,
    isLoading: false,
    error: null,
  });

  const get = async (id: number): Promise<void> => {
    try {
      const response = await axiosInstance.get<Area>(`/areas/${id}`);
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

export default useGetAreaById;
