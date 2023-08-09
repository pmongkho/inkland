/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
		domains: [
			'images.unsplash.com',
			'unsplash.com',
			'cdn-hbeej.nitrocdn.com',
			'uploadthing.com',
			'lh3.googleusercontent.com',
		],
	},
}

module.exports = nextConfig
