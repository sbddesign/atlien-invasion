import { findAtlien } from "@/lib/atlien";

export default function Atlien() {

    const atlien = findAtlien(1,122.454545);

  return (
    <div className="max-w-4xl w-full mx-auto p-8 mt-8 border border-gray-500 rounded">
      <h1 className="text-4xl">{atlien.adjective} {atlien.name}</h1>

        <h2>Unique Number</h2>
        <p>{atlien.uniqueNumber}</p>

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

        <h2>Driver's License Points</h2>
        <p>{atlien.driversLicensePoints}</p>
    </div>
  );
}
