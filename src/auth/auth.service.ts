import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO';
import { RegistrationDTO } from './dto/RegistrationDTO';
import { User } from '../user/user.entity';
import { hash, verify } from 'argon2';
import { randomUUID } from 'crypto';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { AUTH_SESSION_COOKIE, AUTH_QUERY, AUTH_HEADER } from './auth.constants';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  public constructor(@InjectRedis() private readonly redis: Redis) {}

  public async login({
    password,
    usernameOrEmail,
  }: LoginDTO): Promise<false | User> {
    const isEmail = usernameOrEmail.includes('@');
    const user = await User.findOne({
      where: isEmail
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });

    if (!user) {
      return false;
    }

    if (!(await verify(user.password, password + user.salt))) {
      return false;
    }

    return user;
  }

  public async register(data: RegistrationDTO): Promise<User> {
    const user = User.create(plainToInstance(User, data, { groups: ['self'] }));
    user.salt = randomUUID();
    user.password = await hash(data.password + user.salt);
    await user.save();

    return user;
  }

  public async authenticate(res: Response, user: User): Promise<string> {
    const sessid = 'auth-' + randomUUID();
    res.cookie(AUTH_SESSION_COOKIE, sessid);
    await this.redis.set(sessid, user.id);

    return sessid;
  }

  public async logout(req: Request, res: Response): Promise<void> {
    const tokens: (string | null | undefined)[] = [
      req.query[AUTH_QUERY],
      req.headers[AUTH_HEADER],
      req.cookies[AUTH_SESSION_COOKIE],
    ];

    const promises = tokens.map((token) =>
      token ? this.redis.del(token) : null,
    );
    await Promise.all(promises);

    res.clearCookie(AUTH_SESSION_COOKIE);
  }

  public async isAuthenticated(req: Request): Promise<false | User> {
    const token: string = [
      req.query[AUTH_QUERY],
      req.headers[AUTH_HEADER],
      req.cookies[AUTH_SESSION_COOKIE],
    ].find(
      (authToken: string) =>
        typeof authToken === 'string' && authToken.length > 0,
    );

    if (!token) {
      return false;
    }

    const session = await this.redis.get(token);

    if (!session) {
      return false;
    }

    const user = await User.findOneBy({ id: Number(session) });

    return user instanceof User ? user : false;
  }
}
