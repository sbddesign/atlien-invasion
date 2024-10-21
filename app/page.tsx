import Link from "next/link";
import { prisma } from '@/lib/prisma';
import { findAtlien } from "@/lib/atlien";
import Definition from "@/components/Definition";

export default async function Home() {
  const bounties = await prisma.bounty.findMany();

  return (
    <div className="">
      <h1>Bounties</h1>
      <div className="flex flex-col gap-8">
        {bounties.map((bounty) => {
          const [latitude, longitude] = bounty.coordinates.slice(1).split(',').map(Number);
          const atlien = findAtlien(latitude, longitude);

          return (
            <div key={bounty.id} className="rounded-3xl bg-white border border-gray-200 p-6 flex flex-col gap-6">
              <h3 className="text-center">{atlien.adjective} {atlien.name}</h3>
              <dl className="grid grid-cols-2 gap-6">
                <Definition term="Coordinates" description={bounty.coordinates} className="col-span-2" />
                <Definition term="Amount" description={bounty.amount} />
                <Definition term="Claimed By" description={bounty.claimedById ? 'Yes' : 'No'} />
                <Definition term="Species" description={atlien.species} />
                <Definition term="Wings Preference" description={atlien.wingsPreference} />
                <Definition term="Drivers License Points" description={atlien.driversLicensePoints} />
                <Definition 
                  term="Favorite Color" 
                  description={atlien.favoriteColor} 
                  className={`bg-fave-color-${atlien.favoriteColor}`} 
                />
                <Definition term="Favorite Music Venue" description={atlien.favoriteMusicVenue} />
                <Definition term="MARTA Card Value" description={'$' + atlien.martaCardValue} />
                <Definition term="From" description={atlien.neighborhood} />
                <Definition term="Sings Like A" description={atlien.singingAbility + ' / 10'} />
              </dl>
              <div className="hidden">
                <div className="bg-fave-color-0 h-10 w-10"></div>
                <div className="bg-fave-color-10 h-10 w-10"></div>
                <div className="bg-fave-color-20 h-10 w-10"></div>
                <div className="bg-fave-color-30 h-10 w-10"></div>
                <div className="bg-fave-color-40 h-10 w-10"></div>
                <div className="bg-fave-color-50 h-10 w-10"></div>
                <div className="bg-fave-color-60 h-10 w-10"></div>
                <div className="bg-fave-color-70 h-10 w-10"></div>
                <div className="bg-fave-color-80 h-10 w-10"></div>
                <div className="bg-fave-color-90 h-10 w-10"></div>
                <div className="bg-fave-color-100 h-10 w-10"></div>
                <div className="bg-fave-color-110 h-10 w-10"></div>
                <div className="bg-fave-color-120 h-10 w-10"></div>
                <div className="bg-fave-color-130 h-10 w-10"></div>
                <div className="bg-fave-color-140 h-10 w-10"></div>
                <div className="bg-fave-color-150 h-10 w-10"></div>
                <div className="bg-fave-color-160 h-10 w-10"></div>
                <div className="bg-fave-color-170 h-10 w-10"></div>
                <div className="bg-fave-color-180 h-10 w-10"></div>
                <div className="bg-fave-color-190 h-10 w-10"></div>
                <div className="bg-fave-color-200 h-10 w-10"></div>
                <div className="bg-fave-color-210 h-10 w-10"></div>
                <div className="bg-fave-color-220 h-10 w-10"></div>
                <div className="bg-fave-color-230 h-10 w-10"></div>
                <div className="bg-fave-color-240 h-10 w-10"></div>
                <div className="bg-fave-color-250 h-10 w-10"></div>
                <div className="bg-fave-color-260 h-10 w-10"></div>
                <div className="bg-fave-color-270 h-10 w-10"></div>
                <div className="bg-fave-color-280 h-10 w-10"></div>
                <div className="bg-fave-color-290 h-10 w-10"></div>
                <div className="bg-fave-color-300 h-10 w-10"></div>
                <div className="bg-fave-color-310 h-10 w-10"></div>
                <div className="bg-fave-color-320 h-10 w-10"></div>
                <div className="bg-fave-color-330 h-10 w-10"></div>
                <div className="bg-fave-color-340 h-10 w-10"></div>
                <div className="bg-fave-color-350 h-10 w-10"></div>
                <div className="bg-fave-color-360 h-10 w-10"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
