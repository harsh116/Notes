import { useEffect, useState } from "react";
import "./Search.scss";

const Search = (props) => {
  const { setIsSearching, notes, setSearchedNotes } = props;
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (notes.length === 0) {
      return;
    }

    if (searchValue.length === 0) {
      setIsSearching(false);
      setSearchedNotes([]);
      return;
    }

    if (searchValue.includes(" ")) {
      let sNotes = notes.filter((note) =>
        note?.rawtext.toLowerCase().includes(searchValue.toLowerCase())
      );
      setIsSearching(true);
      setSearchedNotes(sNotes);
      return;
    }

    let searchednotes = [];
    for (let note of notes) {
      let text = note.rawtext;
      let words = text.split(" ");

      const len = searchValue.length;
      const pos = words.findIndex(
        (word) =>
          word.substr(0, len).toLowerCase() === searchValue.toLowerCase()
      );
      if (pos === -1) {
        continue;
      }

      searchednotes.push(note);
    }

    setIsSearching(true);
    setSearchedNotes(searchednotes);
  }, [searchValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search">
      <input
        className="searchInput"
        type="text"
        placeholder="Search notes"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
