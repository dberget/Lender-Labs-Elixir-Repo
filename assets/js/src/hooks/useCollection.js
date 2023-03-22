import useSWR from "swr";

export const useCollection = (id) => {
  const { data, isLoading } = useSWR(
    `/api/get_collection?collection_id=${id}`,
    (...args) => fetch(...args, {}).then((res) => res.json())
  );

  const collection = data?.collection ?? {};
  const offers = data?.collection?.offers ?? [];
  const loans = data?.collection?.loans ?? [];

  return { collection, offers, loans, isLoading };
};
