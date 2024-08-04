import { useState, useEffect } from "react";
import { SetStateAction } from "react";
import { Podcast, UseFetch } from "../utils/types";

//Custom hook to get the result of api call with loading state and error.
const useFetchData = (
  query: string,
  page: number,
  setPage: React.Dispatch<SetStateAction<number>>
): UseFetch => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Podcast[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    //setTimeout added to implement debounce with a delay of 300ms.
    const timeout = setTimeout(async () => {
      try {
        let res = await fetch("https://api.tigerhall.net/v2/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `{
                  contentCards(filter: {
                    limit: ${page * 8},
                    keywords: "${query}",
                    types: [PODCAST]
                  }) {
                    edges {
                      ...on Podcast {
                        name
                        image {
                          ...Image
                        }
                        categories {
                          ...Category
                        }
                        experts {
                          ...Expert
                        }
                      }
                    }
                  }
                }
                
                fragment Image on Image {
                  uri
                }
                
                fragment Category on Category {
                  name
                }
                
                fragment Expert on Expert {
                  firstName
                  lastName
                  title
                  company
                }`,
          }),
        });
        let content = await res.json();

        if (content.data.contentCards.edges.length === 0) {
          setIsLoading(false);
          throw error;
        }

        setData(content.data.contentCards.edges);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setData([]);
        let errorMessage = "Data fetching failed";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.log(errorMessage);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, page]);

  return { data, isLoading, error };
};

export default useFetchData;
