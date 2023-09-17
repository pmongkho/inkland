/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		appDir: true,
		serverComponentsExternalPackages: ['mongoose'],
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
