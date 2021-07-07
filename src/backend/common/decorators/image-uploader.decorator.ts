import fs from 'fs';
import path from 'path';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import AWS from 'aws-sdk';
import formidable from 'formidable';

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const ImageUploader = createParamDecorator(async (pathName: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const form = new formidable.IncomingForm();
  const file = await new Promise(function (resolve, reject) {
    form.parse(request, async (err, fields, files) => {
      try {
        request.body = fields;
        const { file } = files;
        if (!file) {
          return resolve(null);
        }
        AWS.config.update({
          accessKeyId: process.env.AWSAccessKeyId,
          secretAccessKey: process.env.AWSSecretKey,
        });
        const s3 = new AWS.S3();
        let fileName = '';
        for (let i = 0; i < 8; i += 1) {
          fileName += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        const key = `${pathName}/${fileName}${path.parse(file.name).ext}`;
        if (process.env.NODE_ENV !== 'test') {
          s3.upload(
            {
              Bucket: process.env.buket as string,
              Key: key,
              ACL: 'public-read',
              Body: fs.createReadStream(file.path),
            },
            (error: any, result: any) => {
              if (error) {
                console.log(error);
                reject(error);
              }
            },
          );
        }

        // unlink tmp files
        fs.unlinkSync(file.path);
        const baseUrl = 'https://cdn.moti.company/';
        const imageUrl = baseUrl + key;
        resolve(imageUrl);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
  return { ...request.body, file };
});
