export const notify = (content) => {
  try {
    fetch(
      "https://discord.com/api/webhooks/1079515258529521725/x_7FSTVA4q4iNUJ6OAgj_i5lAK-dCxzUzP_sUS40W8QCZC28p7hZLgAVapJfssXxN7zu",
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
