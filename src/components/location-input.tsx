import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { citiesList } from "@/lib/cities-list";

type LocationInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onLocationSelected: (location: string) => void;
};

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearch, setLocationSearch] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!locationSearch.trim()) return [];

      const searchWords = locationSearch.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
            searchWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase()),
            ),
        )
        .slice(0, 5);
    }, [locationSearch]);

    return (
      <div className="relative">
        <Input
          placeholder="Search for a location"
          type="search"
          value={locationSearch}
          {...props}
          ref={ref}
          onChange={(e) => setLocationSearch(e.currentTarget.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
        {locationSearch.trim() && hasFocus && (
          <div className="absolute top-10 z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities.map((city) => (
              <button
                className="block w-full p-2 text-start"
                key={city}
                onClick={() => onLocationSelected(city)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearch("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
