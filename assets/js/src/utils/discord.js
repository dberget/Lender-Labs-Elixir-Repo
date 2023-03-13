export const notify = (content) => {
  try {
    fetch(
      "https://discord.com/api/webhooks/1072735677109772359/k_Ysg1KAKtc_o4DdH98bdRPdXDRQfjS4dBsY9pBRYEMNuuNwaL7t40xPwwtucTuVdDPE",
      {
        method: "POST",
        body: JSON.stringify({ content: content }),
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error posting to notify webhook:", err);
  }
};
