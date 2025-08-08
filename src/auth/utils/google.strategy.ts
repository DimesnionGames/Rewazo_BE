import { HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { CustomException } from "src/common/utils/requestResponse";
import { AuthService } from "../service/auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly authService: AuthService)
    {
        const clientID = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_SECRET;
        const callbackURL = process.env.GOOGLE_CALLBACK_URL;
        // Validate that environment variables are not undefined
        if (!clientID || !clientSecret || !callbackURL) {
        throw new CustomException(
            'Google credentials are not defined.',
            'NOT FOUND',
            HttpStatus.NOT_FOUND
        );
        }
        super({
            clientID,
            clientSecret,
            callbackURL,
            scope:['profile','email']
        });
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        if (!emails || emails.length === 0) {
            return done(new Error('No email found in Google profile.'), null);
        }

        const userDetails = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            profilePicture: photos && photos.length > 0 ? photos[0].value : null,
        };

        try {
            const user = await this.authService.findOrCreateGoogleUser(userDetails);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    }

}