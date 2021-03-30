import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

/** Filter images by type
 *
 * @param _
 * @param file the file path
 * @param callback callback function for filtering
 * @returns any
 */
export function imageFilter(_: Request, file: any, callback: Function): any {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException(
        'Only image files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  return callback(null, true);
}

/** Edit image filenames
 *
 * @param _
 * @param file image filepath
 * @param callback callback fn
 * @returns any
 */
export function editFileName(_: Request, file: any, callback: Function): any {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = new Date().getTime();
  return callback(null, `${name}-${randomName}${fileExtName}`);
}
