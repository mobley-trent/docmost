import { Inject, Injectable } from '@nestjs/common';
import { STORAGE_DRIVER_TOKEN } from './constants/storage.constants';
import { StorageDriver } from './interfaces';

@Injectable()
export class StorageService {
  constructor(
    @Inject(STORAGE_DRIVER_TOKEN) private storageDriver: StorageDriver,
  ) {}

  async upload(filePath: string, fileContent: Buffer | any) {
    await this.storageDriver.upload(filePath, fileContent);
  }

  async read(filePath: string): Promise<Buffer> {
    return this.storageDriver.read(filePath);
  }

  async exists(filePath: string): Promise<boolean> {
    return this.storageDriver.exists(filePath);
  }

  async signedUrl(path: string, expireIn: number): Promise<string> {
    return this.storageDriver.getSignedUrl(path, expireIn);
  }

  url(filePath: string): string {
    return this.storageDriver.getUrl(filePath);
  }

  async delete(filePath: string): Promise<void> {
    await this.storageDriver.delete(filePath);
  }
}
