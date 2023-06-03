import fs from 'fs';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import AWS from 'aws-sdk';
import formidable from 'formidable';

export const ImageUploaderLiveName = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
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
        await AWS.config.update({
          accessKeyId: process.env.AWSAccessKeyId,
          secretAccessKey: process.env.AWSSecretKey,
        });
        const s3 = new AWS.S3();
        const key = file.name;
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
        const baseUrl = process.env.STORAGE_BASE_URL;
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
