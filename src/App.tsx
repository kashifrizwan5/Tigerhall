import { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Podcast, UseFetch } from "./utils/types";
import { Header } from "./components/Header/Header";
import Card from "./components/Card/Card";
import Loading from "./components/Loading";
import useFetchData from "./hooks/useFetchData";
import "./App.scss";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, error }: UseFetch = useFetchData(
    query,
    page,
    setPage
  );

  //Logic for handling infinite scroll
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      page < 2
    ) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <>
      <ChakraProvider>
        <Header query={query} setQuery={setQuery} />
        <section>
          <div className="headline-wrapper">
            <p className="headline">Tiger Hall Library</p>
          </div>

          {error && <p className="white">Oops! Try some different keyword </p>}
          <div className="results">
            {data.map((item: Podcast) => {
              return (
                <>
                  <Card {...item} key={item.name} />
                </>
              );
            })}
          </div>
          {isLoading && <Loading />}
        </section>
      </ChakraProvider>
    </>
  );
}

export default App;
