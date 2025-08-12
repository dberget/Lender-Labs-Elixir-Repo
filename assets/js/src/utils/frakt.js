export const getBondsPreview = async () => {
  const res = await fetch("https://api.frakt.xyz/bonds/preview");
  const preview = await res.json();

  return preview;
};

export const getBondMarket = async (marketAdd) => {
  const res = await fetch(
    `https://api.frakt.xyz/markets/${"AUnj4vmhekw3T7gzKmQgwga48wqQzRogRLDvtdgwWoSq"}`
  );
  const market = await res.json();

  return market;
};

export const getMarketPairs = async (market) => {
  const res = await fetch(
    `https://api.frakt.xyz/pairs/${"AUnj4vmhekw3T7gzKmQgwga48wqQzRogRLDvtdgwWoSq"}`
  );
  const pairs = await res.json();

  return pairs;
};

export const getNftMerkleTreeProof = async ({ mint }) => {
  const data = await fetch.get(
    `https://api.frakt.xyz/nft/proof/${mint?.toBase58()}`
  );

  return data.proof || null;
};
