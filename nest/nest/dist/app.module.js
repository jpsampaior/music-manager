"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const node_path_1 = require("node:path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const supabase_module_1 = require("./supabase/supabase.module");
const music_resolver_1 = require("./resolvers/music.resolver");
const playlist_resolver_1 = require("./resolvers/playlist.resolver");
const user_resolver_1 = require("./resolvers/user.resolver");
const music_controller_1 = require("./controllers/music.controller");
const playlist_controller_1 = require("./controllers/playlist.controller");
const user_controller_1 = require("./controllers/user.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, node_path_1.join)(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
            }),
            supabase_module_1.SupabaseModule,
        ],
        controllers: [
            app_controller_1.AppController,
            music_controller_1.MusicController,
            playlist_controller_1.PlaylistController,
            user_controller_1.UserController,
        ],
        providers: [
            app_service_1.AppService,
            music_resolver_1.MusicResolver,
            playlist_resolver_1.PlaylistResolver,
            user_resolver_1.UserResolver,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map