import CreateBountyUI from '@/components/features/CreateBountyUI';
import Map from '@/components/Map';

export default function NewBounty() {
  return (
    <div className="">
      <h1>New Bounty</h1>
      <CreateBountyUI />
      <Map position={[33.7490923,-84.3916997]} />
    </div>
  );
}
