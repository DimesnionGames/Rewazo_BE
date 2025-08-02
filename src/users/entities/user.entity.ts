import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    countryCode: string;

    @Column({ nullable: true })
    mobile: string;

    @Column({ default: true })
    isFirstLogin: boolean;

    @Column({ default: false })
    isMobileVerified: boolean;

    @Column({ nullable: true })
    profilePicture:string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}