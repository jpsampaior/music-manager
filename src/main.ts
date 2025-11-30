import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import * as soap from 'soap';
import { readFileSync } from 'node:fs';
import * as http from 'node:http';
import { MusicSoapService } from './soap/music.soap.service';
import { UserSoapService } from './soap/user.soap.service';
import { PlaylistSoapService } from './soap/playlist.soap.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure gRPC microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['user', 'music', 'playlist'],
      protoPath: [
        join(__dirname, '../proto/user.proto'),
        join(__dirname, '../proto/music.proto'),
        join(__dirname, '../proto/playlist.proto'),
      ],
      url: '0.0.0.0:5000',
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log('HTTP server running on http://localhost:3000');
  console.log('gRPC server running on localhost:5000');

  // Configure SOAP server
  const soapPort = 8000;
  const soapServer = http.createServer((req, res) => {
    res.end('SOAP Server');
  });

  soapServer.listen(soapPort, () => {
    console.log(`SOAP server running on http://localhost:${soapPort}`);
  });

  // Get SOAP services from the app context
  const musicSoapService = app.get(MusicSoapService);
  const userSoapService = app.get(UserSoapService);
  const playlistSoapService = app.get(PlaylistSoapService);

  // Read WSDL file
  const wsdlPath = join(__dirname, '../service.wsdl');
  const wsdlXml = readFileSync(wsdlPath, 'utf8');

  // Create SOAP services object with all operations
  const soapServices = {
    MusicService: {
      MusicServicePort: {
        // User operations
        createUser: (args: any) => userSoapService.createUser(args),
        getUser: (args: any) => userSoapService.getUser(args),
        updateUser: (args: any) => userSoapService.updateUser(args),
        deleteUser: (args: any) => userSoapService.deleteUser(args),
        listUsers: () => userSoapService.listUsers(),

        // Song operations
        createSong: (args: any) => musicSoapService.createSong(args),
        getSong: (args: any) => musicSoapService.getSong(args),
        updateSong: (args: any) => musicSoapService.updateSong(args),
        deleteSong: (args: any) => musicSoapService.deleteSong(args),
        listSongs: () => musicSoapService.listSongs(),

        // Playlist operations
        createPlaylist: (args: any) => playlistSoapService.createPlaylist(args),
        getPlaylist: (args: any) => playlistSoapService.getPlaylist(args),
        updatePlaylist: (args: any) => playlistSoapService.updatePlaylist(args),
        deletePlaylist: (args: any) => playlistSoapService.deletePlaylist(args),
        listPlaylists: () => playlistSoapService.listPlaylists(),
        addSongsToPlaylist: (args: any) =>
          playlistSoapService.addSongsToPlaylist(args),
        removeSongsFromPlaylist: (args: any) =>
          playlistSoapService.removeSongsFromPlaylist(args),
        listSongsByPlaylist: (args: any) =>
          musicSoapService.listSongsByPlaylist(args),
        listPlaylistsBySong: (args: any) =>
          playlistSoapService.listPlaylistsBySong(args),
      },
    },
  };

  // Initialize SOAP server with WSDL
  soap.listen(soapServer, '/soap', soapServices, wsdlXml);
}
bootstrap();
