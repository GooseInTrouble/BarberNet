export default function SearchBar() {
  return (
    <div className="flex justify-between">
      <form
        className="p-0.5 bg-white rounded-full h-11 flex justify-between text-lg"
        action="catalog"
      >
        <input
          className="rounded-full p-2 text-black mr-0.5"
          type="text"
          placeholder="Search..."
          name="search"
        />
        <button
          className="bg-emerald-600 float-right aspect-square rounded-full text-white"
          type="submit"
        >
          Go
        </button>
      </form>
    </div>
  );
}
