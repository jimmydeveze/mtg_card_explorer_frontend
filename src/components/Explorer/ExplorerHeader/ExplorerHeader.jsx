import searchIcon from "../../../images/search.svg";

function ExplorerHeader({ query, setQuery, onSubmit, openFilters }) {
  return (
    <form className="explorer__header" onSubmit={onSubmit}>
      <h1 className="explorer__title">Explorar Cartas</h1>

      <input
        type="text"
        placeholder="Buscar carta..."
        className="explorer__search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit" className="explorer__submit">
        <img src={searchIcon} alt="" />
        <span className="explorer__submit-text">Buscar</span>
      </button>

      <button type="button" className="explorer__submit" onClick={openFilters}>
        Filtros
      </button>
    </form>
  );
}

export default ExplorerHeader;
