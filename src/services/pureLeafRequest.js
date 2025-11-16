import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItem } from "../utils/localStorage";
import { toast } from "sonner";

const pureLeafUrl =
  import.meta.env.VITE_BASEURL ||
  "https://6909dc5c1a446bb9cc205352.mockapi.io/pureleaf/v1";

// read all data

export const useFilledData = () => {
  return useQuery({
    queryKey: ["filledData"],
    queryFn: async () => {
      const response = await axios.get(`${pureLeafUrl}/menu`, {
        headers: {
          accept: "application/json",
        },
      });

      return response.data;
    },
    onError: (error) => {
      console.error("Error fetching filled data:", error);
    },
  });
};

// create Data

export const useCreateData = () => {
  const client = useQueryClient();
  const token = getItem("accessToken");

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${pureLeafUrl}/menu`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["filledData"],
      });
    },
    onError: (error) => {
      console.error("Error creating data:", error);
    },
  });
};

// update Data

export const useUpdateData = () => {
  const client = useQueryClient();
  const token = getItem("accessToken");

  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const response = await axios.put(`${pureLeafUrl}/menu/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      });
      return response.data;
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["filledData"] });
    },
    onError: (error) => {
      console.error("Error updating data:", error);
    },
  });
};

// delete Data

export const useDeleteData = () => {
  const client = useQueryClient();
  const token = getItem("accessToken");

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${pureLeafUrl}/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["filledData"] });
    },
    onError: (error) => {
      console.error("Error deleting data:", error);
    },
  });
};

// get user profile
export const useAuthProfile = () => {
  return useQuery({
    queryKey: ["authProfile"],
    queryFn: async () => {
      const token = getItem("accessToken");
      const response = await axios.get(`${pureLeafUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      });
      return response.data.data;
    },
  });
};



// update or change business profile
export const updateBusinessProfile = () => {
  const client = useQueryClient();
  const token = getItem("accessToken");

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.patch(
        `${pureLeafUrl}/user/business-profile`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
          transformRequest: (data) => data,
        }
      );
      return response.data.data;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["authProfile"] });
      console.error("user profile successfully updated");

      toast.success("user profile successfully updated");
    },
    onError: (error) => {
      console.error("Error updating business profile:", error);
    },
  });
};


