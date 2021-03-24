import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { OwnerDto } from '../auth/dto/owner.dto';
import { editFileName, imageFileFilter } from '../utils/fileUpload.utils';
import { diskStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HouseRoutesDto } from './dto/house-routes.dto';
import { User } from '../shared/decorators/user.decorator';
import { Patch } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateHouseDto } from './dto/update-house.dto';

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: 'Beautiful house',
        },
        description: {
          type: 'string',
          default: "This is beautiful house, don't miss it",
        },
        district: {
          type: 'string',
          default: 'KICUKIRO',
        },
        street: {
          type: 'string',
          default: 'KN203 ave',
        },
        price: {
          type: 'number',
          default: '10000',
        },
      },
    },
  })
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
    @User() user: any,
  ) {
    return this.houseService.create(user, createHouseDto, files);
  }

  /**
   * Get all house posts
   * @req entry data
   * @enum target type
   * @return response
   */
  @ApiResponse({ status: 200, description: 'House found successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorised' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  findAll(@Req() req: any, @Query() target: HouseRoutesDto) {
    const user = <OwnerDto>req.user;
    return this.houseService.findAll(user, target);
  }

  /** Update a house info
   * @param houseId
   * @param body
   * @returns success
   */
  @Patch('/:houseId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: 'Beautiful house',
        },
        description: {
          type: 'string',
          default: "This is beautiful house, don't miss it",
        },
        district: {
          type: 'string',
          default: 'KICUKIRO',
        },
        street: {
          type: 'string',
          default: 'KN203 ave',
        },
        price: {
          type: 'number',
          default: '10000',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'House updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad entries' })
  @ApiResponse({ status: 401, description: 'Unauthorised' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @Param('houseId', ParseUUIDPipe)
    houseId: string,
    @Body() updateHouseDto: UpdateHouseDto,
    @UploadedFiles() files: Express.Multer.File,
  ) {
    return this.houseService.update(houseId, updateHouseDto, files);
  }
}
