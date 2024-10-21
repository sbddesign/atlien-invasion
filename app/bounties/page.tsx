import { prisma } from '@/lib/prisma';

export default async function Bounties() {
  const bounties = await prisma.bounty.findMany();

  return (
    <div className="">
      <h1>Bounties</h1>
      <ul>
        {bounties.map((bounty) => (
          <li key={bounty.id}>
            <p>Coordinates: {bounty.coordinates}</p>
            <p>Amount: {bounty.amount}</p>
            <p>Claimed: {bounty.claimedById ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
