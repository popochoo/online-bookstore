export interface OAuthRequest {
	user: {
		email: string
		name: string
		picture: string
	}
}

export interface RefreshTokenPayload {
	id: string
}
