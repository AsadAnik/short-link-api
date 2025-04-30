// import { User } from '../models';
// import { BcryptUtils, TokenUtils } from '../lib/shared';
import PrismaClient from '../prisma';

class AuthService {
    // private readonly userModelRepository: typeof User;
    // private readonly bcryptUtils: BcryptUtils;
    // private readonly tokenUtils: TokenUtils;

    // constructor(userModelRepository: typeof User = User) {
    //     this.userModelRepository = userModelRepository;
    //     this.bcryptUtils = new BcryptUtils();
    //     this.tokenUtils = new TokenUtils();
    // }

    /**
     * USER LOGIN SERVICE
     * @param userInfo @Object - { emaiL: string, password: string }
     * @return Promise<{ any }>
     */
    // region Login Service
    public async loginUser(userInfo: { email: string, password: string, ipAddress: string, userAgent: string }): Promise<any> {
        try {
            return {
                success: true,
                message: 'Login Successful',
            };

        } catch (error) {
            console.error(`Error to login user: ${error}`);
            throw error;
        }
    }


    /**
     * USER REGISTRATION SERVICE
     * @param userInfo
     */
    // region Registration Service
    public async register(userInfo: any): Promise<any> {
        try {
            const createUser = await PrismaClient.user.create({ data: userInfo });
            if (!createUser) throw new Error(`Error while creating user : ${createUser}`);

            console.log('CREATED USER - ', createUser);
            return { success: true, message: 'Registered User', data: createUser };

        } catch (error) {
            console.error(`Error occcured while register user: ${error}`);
            throw error;
        }
    }


    /**
     * USER LOGOUT
     * Own logout feature service
     */
    // region User Logout
    public async logoutUser(refreshToken: string): Promise<any> {
        try {
            return { success: true, message: 'Logout User' }

        } catch (error) {
            console.error(`Error occured while do logout: ${error}`);
            throw error;
        }
    }
}

export default AuthService;