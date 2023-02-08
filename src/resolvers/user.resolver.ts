import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
    AllUserResponse,
  SignInInput,
  SignInResponse,
  SignUpInput,
  UserResponse,
} from '../schemas/user.schema';
import UserService from '../services/user.service';
import { Context } from '../types/context';

@Resolver()
export default class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Mutation(() => UserResponse)
    async signupUser(@Arg('input') input: SignUpInput) {
        return this.userService.signUpUser(input);
    }

    @Mutation(() => SignInResponse)
    async signInUser(@Arg('input') signInInput: SignInInput, @Ctx() ctx: Context) {
        return this.userService.signInUser(signInInput, ctx);
    }

    @Query(() => UserResponse)
    async getMe(@Ctx() ctx: Context) {
        return this.userService.getMe(ctx);
    }

    @Query(() => SignInResponse)
    async refreshAccessToken(@Ctx() ctx: Context) {
        return this.userService.refreshAccessToken(ctx);
    }

    @Query(() => Boolean)
    async signOutUser(@Ctx() ctx: Context) {
        return this.userService.signOutUser(ctx);
    }

    @Query(() => AllUserResponse)
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
}
