import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { OwnerDto } from '../auth/dto/owner.dto';
import { editFileName, imageFileFilter } from '../utils/fileUpload.utils';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Houses')
@Controller('houses')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  /**
   * Create a house for sale
   * @req request data
   * @body entry data
   * @files entry images of a house
   * @return response
   */
  @ApiResponse({ status: 201, description: 'House posted successfully' })
  @ApiResponse({ status: 400, description: 'Bad entries' })
  @ApiResponse({ status: 401, description: 'Unauthorised' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createHouseDto: CreateHouseDto,
    @Req() req: any,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    const user = <OwnerDto>req.user;
    return this.houseService.create(user, createHouseDto, files);
  }
}
