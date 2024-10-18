import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>ATLien Invasion</h1>
      <ul>
        <li><Link href="/atlien/@33.759752,-84.364879">ATLien Profile - ATL BitLab Coordinates</Link></li>
        <li><Link href="/atlien/@30.2699818,-97.7436564">ATLien Profile - PlebLab Coordinates</Link></li>
        <li><Link href="/atlien/@40.7532668,-73.9780228">ATLien Profile - Chaincode Labs Coordinates</Link></li>
        <li><Link href="/atlien/@36.1347795,-86.8033507">ATLien Profile - Bitcoin Park Coordinates</Link></li>
      </ul>
      
      
      
      

      
    </div>
  );
}
