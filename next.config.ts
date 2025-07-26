/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/leaderboard",
        destination: "http://localhost:8000/leaderboard",
      },
      {
        source: "/api/score",
        destination: "http://localhost:8000/score",
      },
    ];
  },
};

module.exports = nextConfig;
