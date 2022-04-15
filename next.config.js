/*
 * @Author: 邱彦兮
 * @Date: 1985-10-26 16:15:00
 * @LastEditors: 邱彦兮
 * @LastEditTime: 2022-04-15 12:08:14
 * @FilePath: /first-low-code-demo/next.config.js
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:slug*',
          destination: `http://127.0.0.1:3333/:slug*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
