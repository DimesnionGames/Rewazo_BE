import { Controller, Get, UseGuards, Req, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { GoogleAuthGuard, GoogleIdTokenGuard } from '../utils/guards';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { SuccessResponse } from '../../common/utils/requestResponse';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        // Guard handles the redirect
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async handleRedirect(@Req() req: Request, @Res() res: Response) {
        const user = req.user as User;
        const { token } = await this.authService.login(user);
        const webAppUrl = process.env.WEB_APP_URL;

        // Redirect to the frontend with the token
        res.redirect(`${webAppUrl}/auth/callback?token=${token}`);
    }

    @Post('google/token-login')
    @UseGuards(GoogleIdTokenGuard)
    async handleTokenLogin(@Req() req: Request): Promise<SuccessResponse> {
        const user = req.user as User;
        const tokenData = await this.authService.login(user);
        return {
            message: ['User logged in successfully.'],
            statusCode: HttpStatus.OK,
            error: null,
            data: tokenData,
        };
    }
}
