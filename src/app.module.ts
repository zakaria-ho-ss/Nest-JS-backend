import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { MailModule } from './services/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { BooksModule } from './modules/books/books.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
console.log(config.database.mongoDB_Cluster);
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', './assets/booksImages'),
    }),
    AuthModule,
    UserModule,
    MailModule,
    CarsModule,
    BooksModule,
    MongooseModule.forRoot(config.database.mongoDB_Cluster),
    MulterModule.register({
      dest: './src/assets/booksImages',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
