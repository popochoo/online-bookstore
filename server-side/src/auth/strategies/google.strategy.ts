import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PassportStrategy } from '@nestjs/passport'
import { Profile } from 'passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private configService: ConfigService) {
		super({
			clientID: configService.get<string>('GOOGLE_CLIENT_ID') || '',
			clientSecret:
				configService.get<string>('GOOGLE_CLIENT_SECRET') || '',
			callbackURL:
				configService.get<string>('SERVER_URL') +
					'/auth/google/callback' || '',
			scope: ['profile', 'email']
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	) {
		const { displayName, emails, photos } = profile

		const user = {
			email: emails && emails.length > 0 ? emails[0].value : '',
			name: displayName,
			picture: photos && photos.length > 0 ? photos[0].value : ''
		}

		await Promise.resolve()

		done(null, user)
	}
}
