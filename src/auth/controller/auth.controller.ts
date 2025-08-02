import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { SuccessResponse } from '../../common/utils/requestResponse';
import { GoogleAuthGuard } from '../utils/guards';

@Controller('auth')
export class AuthController {
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin()
    {
        const response: SuccessResponse = {
        message: ['User Logged In'],
        statusCode: HttpStatus.OK,
        error: null,
        data:null,
        };
        return response;
    }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect()
    {
        const response: SuccessResponse = {
        message: ['User Logged In'],
        statusCode: HttpStatus.OK,
        error: null,
        data:null,
        };
        return response;
    }
}
