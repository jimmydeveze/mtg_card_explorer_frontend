function ExplorerChips({ filters, removeFilter }) {
  return (
    <div className="explorer__chips">
      {filters.color && (
        <button
          onClick={() => removeFilter("color")}
          className={`chip chip--${filters.color}`}
        >
          {filters.color.toUpperCase()} ✕
        </button>
      )}

      {filters.type && (
        <button
          onClick={() => removeFilter("type")}
          className="chip chip--type"
        >
          {filters.type} ✕
        </button>
      )}

      {filters.rarity && (
        <button
          onClick={() => removeFilter("rarity")}
          className="chip chip--rarity"
        >
          {filters.rarity} ✕
        </button>
      )}

      {filters.legal && (
        <button
          onClick={() => removeFilter("legal")}
          className="chip chip--legal"
        >
          {filters.legal} ✕
        </button>
      )}

      {filters.creaturesOnly && (
        <button
          onClick={() => removeFilter("creaturesOnly")}
          className="chip chip--type"
        >
          criaturas ✕
        </button>
      )}
    </div>
  );
}

export default ExplorerChips;
