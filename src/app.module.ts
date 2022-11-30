import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TopPageModule } from "./top-page/top-page.module";
import { ReviewModule } from "./review/review.module";
import { ProductModule } from "./product/product.module";
import { TypegooseModule } from "nestjs-typegoose";
import { getMongoConfig } from "./configs/mongo.config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
    TopPageModule,
    ReviewModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
