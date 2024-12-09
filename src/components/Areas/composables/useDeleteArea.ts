import { reactive, toRefs } from "vue";
import type { AxiosError } from "axios";
import axiosInstance from "@/services/axiosInstance";
import type { Area } from "@/models/area.model";

interface State {
  data: Area | null;
  isLoading: boolean;
  error: null | AxiosError;
}

function useDeleteArea() {
  const state = reactive<State>({
    data: null,
    isLoading: false,
    error: null,
  });

  const deleteArea = async (id: number): Promise<void> => {
    try {
      state.isLoading = true;
      await axiosInstance.delete(`/areas/${id}`);
    } catch (error) {
      state.error = error as AxiosError;
      console.error(error);
    } finally {
      state.isLoading = false;
    }
  };

  return {
    ...toRefs(state),
    deleteArea,
  };
}

export default useDeleteArea;
