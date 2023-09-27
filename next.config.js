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
			'utfs.io',
			'clipart-library.com',
			'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com',
		],
	},
}

module.exports = nextConfig
