import axios, { AxiosInstance } from 'axios';
import { gql } from 'graphql-tag';
import fetch from 'cross-fetch';
import * as soap from 'soap';
import { credentials } from '@grpc/grpc-js';

/**
 * Interface para configuração do cliente
 */
export interface ClientConfig {
  rest: {
    baseUrl: string;
    timeout: number;
  };
  graphql: {
    url: string;
    timeout: number;
  };
  soap: {
    url: string;
    wsdlUrl: string;
    timeout: number;
  };
  grpc: {
    url: string;
    timeout: number;
  };
}

/**
 * Interfaces de dados
 */
export interface User {
  id: number;
  name: string;
  age: number;
}

export interface Music {
  id: number;
  name: string;
  artist: string;
}

export interface Playlist {
  id: number;
  name: string;
}

/**
 * Cliente unificado para o serviço de streaming de músicas
 * Suporta: REST, GraphQL, SOAP e gRPC
 */
export class MusicStreamingClient {
  private config: ClientConfig;
  private restClient: AxiosInstance;
  private graphqlEndpoint: string;
  private soapClient: any = null;
  private grpcClients: any = {};

  constructor(config?: Partial<ClientConfig>) {
    this.config = {
      rest: {
        baseUrl: config?.rest?.baseUrl || 'http://localhost:3000',
        timeout: config?.rest?.timeout || 5000,
      },
      graphql: {
        url: config?.graphql?.url || 'http://localhost:3000/graphql',
        timeout: config?.graphql?.timeout || 5000,
      },
      soap: {
        url: config?.soap?.url || 'http://localhost:8000/soap',
        wsdlUrl: config?.soap?.wsdlUrl || 'http://localhost:3000/service.wsdl',
        timeout: config?.soap?.timeout || 5000,
      },
      grpc: {
        url: config?.grpc?.url || 'localhost:5000',
        timeout: config?.grpc?.timeout || 5000,
      },
    };

    // Inicializar cliente REST
    this.restClient = axios.create({
      baseURL: this.config.rest.baseUrl,
      timeout: this.config.rest.timeout,
    });

    // Guardar endpoint GraphQL
    this.graphqlEndpoint = this.config.graphql.url;
  }

  /**
   * Fazer query GraphQL
   */
  private async graphqlQuery(query: string, variables?: any): Promise<any> {
    try {
      const response = await axios.post(
        this.graphqlEndpoint,
        {
          query,
          variables,
        },
        {
          timeout: this.config.graphql.timeout,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.errors) {
        throw new Error(`GraphQL error: ${response.data.errors[0].message}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('Erro ao fazer query GraphQL:', error);
      throw error;
    }
  }

  /**
   * Inicializar cliente SOAP (deve ser chamado antes de usar)
   */
  async initializeSoapClient(): Promise<void> {
    if (this.soapClient) return;

    try {
      return new Promise((resolve, reject) => {
        soap.createClient(this.config.soap.wsdlUrl, (err: any, client: any) => {
          if (err) {
            console.error('Erro ao inicializar cliente SOAP:', err);
            reject(err);
          } else {
            this.soapClient = client;
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Erro ao inicializar cliente SOAP:', error);
      throw error;
    }
  }

  /**
   * Inicializar clientes gRPC (deve ser chamado antes de usar)
   */
  async initializeGrpcClients(): Promise<void> {
    if (Object.keys(this.grpcClients).length > 0) return;

    try {
      // Dinamicamente carregar os proto files
      const path = require('path');
      const protoLoader = require('@grpc/proto-loader');
      const grpc = require('@grpc/grpc-js');

      const protoPath = path.join(__dirname, '../../proto');

      // Carregar User service
      const userProtoPath = path.join(protoPath, 'user.proto');
      const userPackageDef = protoLoader.loadSync(userProtoPath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });
      const userProto = grpc.loadPackageDefinition(userPackageDef);
      this.grpcClients.user = new (userProto as any).user.UserService(
        this.config.grpc.url,
        credentials.createInsecure(),
      );

      // Carregar Music service
      const musicProtoPath = path.join(protoPath, 'music.proto');
      const musicPackageDef = protoLoader.loadSync(musicProtoPath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });
      const musicProto = grpc.loadPackageDefinition(musicPackageDef);
      this.grpcClients.music = new (musicProto as any).music.MusicService(
        this.config.grpc.url,
        credentials.createInsecure(),
      );

      // Carregar Playlist service
      const playlistProtoPath = path.join(protoPath, 'playlist.proto');
      const playlistPackageDef = protoLoader.loadSync(playlistProtoPath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });
      const playlistProto = grpc.loadPackageDefinition(playlistPackageDef);
      this.grpcClients.playlist = new (playlistProto as any).playlist
        .PlaylistService(this.config.grpc.url, credentials.createInsecure());
    } catch (error) {
      console.error('Erro ao inicializar clientes gRPC:', error);
      throw error;
    }
  }

  // ==================== REST API ====================

  /**
   * REST: Listar todos os usuários
   */
  async restListAllUsers(): Promise<User[]> {
    try {
      const response = await this.restClient.get<User[]>('/user');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar usuários (REST):', error);
      throw error;
    }
  }

  /**
   * REST: Listar todas as músicas
   */
  async restListAllMusics(): Promise<Music[]> {
    try {
      const response = await this.restClient.get<Music[]>('/music');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar músicas (REST):', error);
      throw error;
    }
  }

  /**
   * REST: Listar playlists de um usuário
   */
  async restListUserPlaylists(userId: number): Promise<Playlist[]> {
    try {
      const response = await this.restClient.get<Playlist[]>(
        `/user/${userId}/playlists`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao listar playlists do usuário ${userId} (REST):`,
        error,
      );
      throw error;
    }
  }

  /**
   * REST: Listar músicas de uma playlist
   */
  async restListPlaylistMusics(playlistId: number): Promise<Music[]> {
    try {
      const response = await this.restClient.get<Music[]>(
        `/playlist/${playlistId}/musics`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao listar músicas da playlist ${playlistId} (REST):`,
        error,
      );
      throw error;
    }
  }

  /**
   * REST: Listar playlists que contêm uma música
   */
  async restListPlaylistsByMusic(musicId: number): Promise<Playlist[]> {
    try {
      const response = await this.restClient.get<Playlist[]>(
        `/music/${musicId}/playlists`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao listar playlists com música ${musicId} (REST):`,
        error,
      );
      throw error;
    }
  }

  // ==================== GraphQL ====================

  /**
   * GraphQL: Listar todos os usuários
   */
  async graphqlListAllUsers(): Promise<User[]> {
    try {
      const data = await this.graphqlQuery(`
        query {
          users {
            id
            name
            age
          }
        }
      `);
      return data.users;
    } catch (error) {
      console.error('Erro ao listar usuários (GraphQL):', error);
      throw error;
    }
  }

  /**
   * GraphQL: Listar todas as músicas
   */
  async graphqlListAllMusics(): Promise<Music[]> {
    try {
      const data = await this.graphqlQuery(`
        query {
          musics {
            id
            name
            artist
          }
        }
      `);
      return data.musics;
    } catch (error) {
      console.error('Erro ao listar músicas (GraphQL):', error);
      throw error;
    }
  }

  /**
   * GraphQL: Listar playlists de um usuário
   */
  async graphqlListUserPlaylists(userId: number): Promise<Playlist[]> {
    try {
      const data = await this.graphqlQuery(
        `
        query GetUserPlaylists($userId: Int!) {
          user(id: $userId) {
            id
            name
            playlists {
              id
              name
            }
          }
        }
      `,
        { userId },
      );
      return data.user?.playlists || [];
    } catch (error) {
      console.error(
        `Erro ao listar playlists do usuário ${userId} (GraphQL):`,
        error,
      );
      throw error;
    }
  }

  /**
   * GraphQL: Listar músicas de uma playlist
   */
  async graphqlListPlaylistMusics(playlistId: number): Promise<Music[]> {
    try {
      const data = await this.graphqlQuery(
        `
        query GetPlaylistMusics($playlistId: Int!) {
          playlist(id: $playlistId) {
            id
            name
            musics {
              id
              name
              artist
            }
          }
        }
      `,
        { playlistId },
      );
      return data.playlist?.musics || [];
    } catch (error) {
      console.error(
        `Erro ao listar músicas da playlist ${playlistId} (GraphQL):`,
        error,
      );
      throw error;
    }
  }

  /**
   * GraphQL: Listar playlists que contêm uma música
   */
  async graphqlListPlaylistsByMusic(musicId: number): Promise<Playlist[]> {
    try {
      const data = await this.graphqlQuery(
        `
        query GetMusicPlaylists($musicId: Int!) {
          music(id: $musicId) {
            id
            name
            artist
            playlists {
              id
              name
            }
          }
        }
      `,
        { musicId },
      );
      return data.music?.playlists || [];
    } catch (error) {
      console.error(
        `Erro ao listar playlists com música ${musicId} (GraphQL):`,
        error,
      );
      throw error;
    }
  }

  // ==================== SOAP ====================

  /**
   * SOAP: Listar todos os usuários
   */
  async soapListAllUsers(): Promise<User[]> {
    if (!this.soapClient) await this.initializeSoapClient();

    try {
      return new Promise((resolve, reject) => {
        this.soapClient.FindAllUsers((err: any, result: any) => {
          if (err) reject(err);
          else resolve(result?.users || []);
        });
      });
    } catch (error) {
      console.error('Erro ao listar usuários (SOAP):', error);
      throw error;
    }
  }

  /**
   * SOAP: Listar todas as músicas
   */
  async soapListAllMusics(): Promise<Music[]> {
    if (!this.soapClient) await this.initializeSoapClient();

    try {
      return new Promise((resolve, reject) => {
        this.soapClient.FindAllMusics((err: any, result: any) => {
          if (err) reject(err);
          else resolve(result?.musics || []);
        });
      });
    } catch (error) {
      console.error('Erro ao listar músicas (SOAP):', error);
      throw error;
    }
  }

  /**
   * SOAP: Listar playlists de um usuário
   */
  async soapListUserPlaylists(userId: number): Promise<Playlist[]> {
    if (!this.soapClient) await this.initializeSoapClient();

    try {
      return new Promise((resolve, reject) => {
        this.soapClient.FindUserPlaylists({ userId }, (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result?.playlists || []);
        });
      });
    } catch (error) {
      console.error(
        `Erro ao listar playlists do usuário ${userId} (SOAP):`,
        error,
      );
      throw error;
    }
  }

  /**
   * SOAP: Listar músicas de uma playlist
   */
  async soapListPlaylistMusics(playlistId: number): Promise<Music[]> {
    if (!this.soapClient) await this.initializeSoapClient();

    try {
      return new Promise((resolve, reject) => {
        this.soapClient.FindPlaylistMusics(
          { playlistId },
          (err: any, result: any) => {
            if (err) reject(err);
            else resolve(result?.musics || []);
          },
        );
      });
    } catch (error) {
      console.error(
        `Erro ao listar músicas da playlist ${playlistId} (SOAP):`,
        error,
      );
      throw error;
    }
  }

  /**
   * SOAP: Listar playlists que contêm uma música
   */
  async soapListPlaylistsByMusic(musicId: number): Promise<Playlist[]> {
    if (!this.soapClient) await this.initializeSoapClient();

    try {
      return new Promise((resolve, reject) => {
        this.soapClient.FindPlaylistsByMusic(
          { musicId },
          (err: any, result: any) => {
            if (err) reject(err);
            else resolve(result?.playlists || []);
          },
        );
      });
    } catch (error) {
      console.error(
        `Erro ao listar playlists com música ${musicId} (SOAP):`,
        error,
      );
      throw error;
    }
  }

  // ==================== gRPC ====================

  /**
   * gRPC: Listar todos os usuários
   */
  async grpcListAllUsers(): Promise<User[]> {
    if (!this.grpcClients.user) await this.initializeGrpcClients();

    try {
      return new Promise((resolve, reject) => {
        this.grpcClients.user.FindAll({}, (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result?.users || []);
        });
      });
    } catch (error) {
      console.error('Erro ao listar usuários (gRPC):', error);
      throw error;
    }
  }

  /**
   * gRPC: Listar todas as músicas
   */
  async grpcListAllMusics(): Promise<Music[]> {
    if (!this.grpcClients.music) await this.initializeGrpcClients();

    try {
      return new Promise((resolve, reject) => {
        this.grpcClients.music.FindAll({}, (err: any, result: any) => {
          if (err) reject(err);
          else resolve(result?.musics || []);
        });
      });
    } catch (error) {
      console.error('Erro ao listar músicas (gRPC):', error);
      throw error;
    }
  }

  /**
   * gRPC: Listar playlists de um usuário
   */
  async grpcListUserPlaylists(userId: number): Promise<Playlist[]> {
    if (!this.grpcClients.user) await this.initializeGrpcClients();

    try {
      return new Promise((resolve, reject) => {
        this.grpcClients.user.FindPlaylists(
          { id: userId },
          (err: any, result: any) => {
            if (err) reject(err);
            else resolve(result?.playlists || []);
          },
        );
      });
    } catch (error) {
      console.error(
        `Erro ao listar playlists do usuário ${userId} (gRPC):`,
        error,
      );
      throw error;
    }
  }

  /**
   * gRPC: Listar músicas de uma playlist
   */
  async grpcListPlaylistMusics(playlistId: number): Promise<Music[]> {
    if (!this.grpcClients.playlist) await this.initializeGrpcClients();

    try {
      return new Promise((resolve, reject) => {
        this.grpcClients.playlist.FindMusics(
          { id: playlistId },
          (err: any, result: any) => {
            if (err) reject(err);
            else resolve(result?.musics || []);
          },
        );
      });
    } catch (error) {
      console.error(
        `Erro ao listar músicas da playlist ${playlistId} (gRPC):`,
        error,
      );
      throw error;
    }
  }

  /**
   * gRPC: Listar playlists que contêm uma música
   */
  async grpcListPlaylistsByMusic(musicId: number): Promise<Playlist[]> {
    if (!this.grpcClients.playlist) await this.initializeGrpcClients();

    try {
      return new Promise((resolve, reject) => {
        this.grpcClients.playlist.FindByMusic(
          { musicId },
          (err: any, result: any) => {
            if (err) reject(err);
            else resolve(result?.playlists || []);
          },
        );
      });
    } catch (error) {
      console.error(
        `Erro ao listar playlists com música ${musicId} (gRPC):`,
        error,
      );
      throw error;
    }
  }

  // ==================== UTILITÁRIOS ====================

  /**
   * Verificar saúde de cada tecnologia
   */
  async healthCheck(): Promise<{
    rest: boolean;
    graphql: boolean;
    soap: boolean;
    grpc: boolean;
  }> {
    const results = {
      rest: false,
      graphql: false,
      soap: false,
      grpc: false,
    };

    // Verificar REST
    try {
      await this.restClient.get('/user');
      results.rest = true;
    } catch {
      results.rest = false;
    }

    // Verificar GraphQL
    try {
      await this.graphqlQuery(`
        query {
          users {
            id
          }
        }
      `);
      results.graphql = true;
    } catch {
      results.graphql = false;
    }

    // Verificar SOAP
    try {
      await this.soapListAllUsers();
      results.soap = true;
    } catch {
      results.soap = false;
    }

    // Verificar gRPC
    try {
      await this.grpcListAllUsers();
      results.grpc = true;
    } catch {
      results.grpc = false;
    }

    return results;
  }
}

// Exportar instância padrão
export const createMusicClient = (config?: Partial<ClientConfig>) =>
  new MusicStreamingClient(config);
