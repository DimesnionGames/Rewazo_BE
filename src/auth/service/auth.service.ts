import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { userDetails } from '../types/googleUserPayload.type';
import { CustomException } from 'src/common/utils/requestResponse';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async findOrCreateGoogleUser(userDetails: userDetails): Promise<User> {
        try {
            let user = await this.usersRepository.findOne({ where: { email: userDetails.email } });
            if (user) {
                console.log(`✅ Returning user found via Google: ${user.email}`);
                return user;
            }
            const newUser = this.usersRepository.create({
                email: userDetails.email,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                profilePicture: userDetails.profilePicture,
            });
            user = await this.usersRepository.save(newUser);
            console.log(`✅ New user signed up via Google: ${user.email}`);
            return user;
        } catch (error) {
            throw new CustomException(
                error.message,
                'METHOD_NOT_ALLOWED',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }
    }

    async login(user: User): Promise<{ token: string }> {
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
