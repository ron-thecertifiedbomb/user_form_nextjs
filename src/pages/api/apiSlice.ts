import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Company } from './types'

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jhayrftpnew.bsite.net/api/" }),
  tagTypes: ["Company"],

  endpoints: (builder) => ({
    getListOfCompanies: builder.query<Company[], void>({
      query: () => "/companies",
      transformResponse: (res: Company[]) =>
        res.sort((a, b) => b.id - a.id),
      providesTags: ["Company"],
    }),

    getCompanyDetail: builder.query<Company, number | undefined>({
      query: ( id ) => `/companies/${id}`,
      providesTags: ["Company"],
    }),

    addCompany: builder.mutation<Company, Partial<Company>>({
      query: (company) => ({
        url: "/companies",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation<Company, Partial<Company>>({
      query: (company) => ({
        url: `/companies/${company.id}`,
        method: "PUT",
        body: company,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteCompany: builder.mutation<number, { id: number }>({
      query: ({ id }) => ({
        url: `/companies/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetListOfCompaniesQuery,
  useGetCompanyDetailQuery,
  useAddCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = apiSlice;
