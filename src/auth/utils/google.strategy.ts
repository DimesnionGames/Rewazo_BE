import { HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { CustomException } from "src/common/utils/requestResponse";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {

    constructor()
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
    ): Promise<any>{
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
    }

}