import { useAccount, useConnectors } from "@starknet-react/core";

import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";
import { useMemo } from "react";

const truncateHash = (hash: any) => hash.slice(0, 5) + "..." + hash.slice(-5);

export default function ConnectWallet() {
  const { account } = useAccount();
  const { connectors, connect, disconnect } = useConnectors();

  const connector = useMemo(
    () => connectors.find((c) => c.options.id === "argentX") ?? connectors[0],
    [connectors]
  );

  if (account)
    return (
      <div>
        <span>{truncateHash(account.address)}</span>
        <HiOutlineLogout title="disconnect" onClick={() => disconnect()} />
      </div>
    );
  else
    return (
      <div
        title="connect"
        onClick={() => (connector ? connect(connector) : undefined)}>
        <span>connect {connector.id()}</span>
        <Image
          src="https://images.prismic.io/argentwebsite/313db37e-055d-42ee-9476-a92bda64e61d_logo.svg"
          width={40}
          height={40}
          alt="img"
        />
      </div>
    );
}