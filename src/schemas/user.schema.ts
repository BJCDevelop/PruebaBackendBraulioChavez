import { Field, InputType, Int, ObjectType } from 'type-graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must be at most 32 characters long' })
  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirm: string | undefined;
}

@InputType()
export class SignInInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(8, { message: 'Invalid email or password' })
  @MaxLength(32, { message: 'Invalid email or password' })
  @Field(() => String)
  password: string;
}

@ObjectType()
export class UserData {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String, { nullable: true })
  readonly id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class UserResponse {
  @Field(() => String)
  status: string;

  @Field(() => UserData)
  user: UserData;
}

@InputType()
class PaginationInputType {
  @Field(() => Int)
  take: number;

  @Field(() => Int)
  skip: number;
}


@ObjectType()
export class AllUserResponse extends PaginationInputType {
  @Field(() => String)
  status: string;

  @Field(() => [UserData])
  users: UserData[];
}

@ObjectType()
export class SignInResponse {
  @Field(() => String)
  status: string;

  @Field(() => String)
  access_token: string;
}
