import path from 'path';
import multer, { Multer } from 'multer';
import { Request } from 'express';
import { Image } from '@/shared/constants/common.constant';
import { trans } from './translation.util';

const MAXSIZE = Image.MAXSIZE;

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: multer.FileFilterCallback,
) => {
	if (file.mimetype.includes('image/')) {
		cb(null, true);
	} else {
		cb(new Error(trans('image.mimetype', {}, 'errors')));
	}
};

const storageUpload = (filePath: string) => {
	return multer.diskStorage({
		destination: function (request, file, callback) {
			callback(null, path.join(process.cwd(), 'public'));
		},
		filename: function (request, file, callback) {
			const [, fileExtension] = file.originalname.split('.');

			callback(null, filePath + '-' + Date.now() + '.' + fileExtension);
		},
	});
};

export const upload = (storage: multer.StorageEngine): Multer => {
	return multer({
		storage: storage,
		limits: {
			fileSize: MAXSIZE,
		},
		fileFilter: fileFilter,
	});
};

export const uploadSingle = (input: string, path: string) => {
	const storage = storageUpload(path);

	return upload(storage).single(input);
};

export const formData = () => {
	return multer().none();
};
