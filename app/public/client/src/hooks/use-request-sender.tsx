import { useAlert } from "@/contexts/alert-context";
import { useNavigate } from "react-router";
import axios from "axios";

export const useRequestSender = () => {
  const navigate = useNavigate();
  const { alert } = useAlert();

  const decorator = (data: any, status: number) => {

    if (status == 401) {
      navigate("/");
      return;
    }

    if (status == 429) {
      alert({
        type: "error",
        title: "Bloqueado",
        message: "Você usou muitas vezes esse recurso, tente novamente mais tarde"
      });
      return;
    }

    try {
      if ("error" in data) {
        alert({ type: "error", title: "Ocorreu um erro", message: data.error });
      }
      if ("message" in data) {
        alert({ type: "success", title: "Sucesso", message: data.message });
      }
    } catch(e) {
      console.error(e);
      alert({ type: "error", title: "Erro desconhecido", message: "Tente novamente mais tarde" });
    }
    return data;
  };

  return {
    get: async (url: string, headers: any) => {
      try {
        const response = await axios.get(url, { headers, validateStatus: () => true, });
        return decorator(response.data, response.status);
      } catch (error: any) {
        alert({
          type: "error",
          title: "Ocorreu um erro",
          message: error.message,
        });
      }
    },

    post: async (url: string, data: any, headers: any) => {
      try {
        const response = await axios.post(url, data, { headers, validateStatus: () => true, });
        return decorator(response.data, response.status);
      } catch (error: any) {
        alert({
          type: "error",
          title: "Ocorreu um erro",
          message: error.message,
        });
      }
    },

    put: async (url: string, data: any, headers: any) => {
      try {
        const response = await axios.put(url, data, { headers, validateStatus: () => true, });
        return decorator(response.data, response.status);
      } catch (error: any) {
        alert({
          type: "error",
          title: "Ocorreu um erro",
          message: error.message,
        });
      }
    },

    delete: async (url: string, headers: any) => {
      try {
        const response = await axios.delete(url, { headers, validateStatus: () => true, });
        return decorator(response.data, response.status);
      } catch (error: any) {
        alert({
          type: "error",
          title: "Ocorreu um erro",
          message: error.message,
        });
      }
    },

    patch: async (url: string, data: any, headers: any) => {
      try {
        const response = await axios.patch(url, data, { headers, validateStatus: () => true, });
        return decorator(response.data, response.status);
      } catch (error: any) {
        alert({
          type: "error",
          title: "Ocorreu um erro",
          message: error.message,
        });
      }
    },
  };
};
