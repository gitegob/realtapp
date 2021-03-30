import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const cloudServiceMock = {
  cloudUpload: () => 'result',
};
