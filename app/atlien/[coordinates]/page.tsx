import { findAtlien } from "@/lib/atlien";

export default function Atlien({ params }: {params: { coordinates: string } }) {

  const coordinatesString = params.coordinates;

  // Decode the URI component to get the original string
  const decodedCoordinatesString = decodeURIComponent(coordinatesString);

  // Remove the '@' and split the string by the comma
  const [latitudeStr, longitudeStr] = decodedCoordinatesString.slice(1).split(',');

  // Convert the strings to numbers
  const latitude = parseFloat(latitudeStr);
  const longitude = parseFloat(longitudeStr);

  // Use the findAtlien function with the extracted coordinates
  const atlien = findAtlien(latitude, longitude);

  return (
    <div className="max-w-4xl w-full mx-auto p-8 mt-8 border border-gray-500 rounded">

      <h1 className="text-4xl">{atlien.adjective} {atlien.name}</h1>

      <h2>Coordinates</h2>
      <p>@{latitude},{longitude}</p>

        <h2>From</h2>
        <p>{atlien.neighborhood}</p>



        <h2>Species</h2>
        <p>{atlien.species}</p>

        <h2>Favorite Color</h2>
        <p>{atlien.favoriteColor}</p>

        <h2>Wings Preference</h2>
        <p>{atlien.wingsPreference}</p>

        <h2>Favorite Music Venue</h2>
        <p>{atlien.favoriteMusicVenue}</p>

        <h2>Singing Ability</h2>
        <p>{atlien.singingAbility}</p>

        <h2>MARTA Card Value</h2>
        <p>${atlien.martaCardValue.toFixed(2)}</p>

        <h2>Driver&rsquo;s License Points</h2>
        <p>{atlien.driversLicensePoints}</p>
    </div>
  );
}
