import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";
import { useDebounce } from "../hooks/useDebounce";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

function ThreadList() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["threads", { search: debouncedSearch, sort }],
    queryFn: ({ queryKey }) => getThreads(queryKey[1]),
    placeholderData: keepPreviousData,
  });

  return (
    <section>
      <h2>Threads</h2>

      <SearchBar value={search} onChange={setSearch} />

      <SortDropdown value={sort} onChange={setSort} />

      {isPending && <p>Loading threads...</p>}

      {isError && (
        <p>Error loading threads: {error.message}</p>
      )}

      {data && (
        <ul>
          {data.map((thread) => (
            <li key={thread.id}>
              <h3>{thread.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ThreadList;