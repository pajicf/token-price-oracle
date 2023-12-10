export function isLocalEnvironment(networkName: string) {
  return networkName === "hardhat" || networkName === "localhost";
}