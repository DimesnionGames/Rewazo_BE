import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from '../service/auth.service';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleIdTokenStrategy extends PassportStrategy(Strategy, 'google-id-token') {
    private readonly client: OAuth2Client;

    constructor(private readonly authService: AuthService) {
        super();
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async validate(req: Request): Promise<any> {
        const { idToken } = req.body;
        if (!idToken) {
            throw new UnauthorizedException('No ID token provided');
        }

        try {
            const ticket = await this.client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new UnauthorizedException('Invalid Google token');
            }

            const userDetails = {
                email: payload.email,
                firstName: payload.given_name,
                lastName: payload.family_name,
                profilePicture: payload.picture,
            };

            const user = await this.authService.findOrCreateGoogleUser(userDetails);
            return user;
        } catch (error) {
            throw new UnauthorizedException('Failed to validate Google token', error.message);
        }
    }
}
