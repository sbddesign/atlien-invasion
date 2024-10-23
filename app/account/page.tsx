import NostrAuth from "@/components/features/NostrAuth";
import Wallet from "@/components/Wallet";
export default function Account() {
  return (
    <div className="">
      <h1>My Account</h1>
      <NostrAuth />
      <Wallet />
    </div>
  );
}
