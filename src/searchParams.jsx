import { useState, useEffect } from "react";
import Results from "./Results";
import Pet from "./Pet";
import useBreedList from "./useBreedLisr";

const ANIMALS = ["dog", "cat", "bird", "reptile"];
const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  const [breeds] = useBreedList(animal);
  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="location"
            value={location}
            id="location"
          />
        </label>
        <label htmlFor="animal">
          animal
          <select
            onChange={(e) => setAnimal(e.target.value)}
            placeholder="animal"
            value={animal}
            id="animal"
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
            {animal}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select
            onChange={(e) => setBreed(e.target.value)}
            placeholder="breed"
            value={breed}
            id="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      <Results pets={pets} />;
    </div>
  );
};
export default SearchParams;
